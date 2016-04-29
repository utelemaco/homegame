package com.utelemaco.web.rest;

import com.utelemaco.HomegameApp;
import com.utelemaco.domain.Round;
import com.utelemaco.repository.RoundRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the RoundResource REST controller.
 *
 * @see RoundResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = HomegameApp.class)
@WebAppConfiguration
@IntegrationTest
public class RoundResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_DATE_STR = dateTimeFormatter.format(DEFAULT_DATE);

    @Inject
    private RoundRepository roundRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restRoundMockMvc;

    private Round round;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RoundResource roundResource = new RoundResource();
        ReflectionTestUtils.setField(roundResource, "roundRepository", roundRepository);
        this.restRoundMockMvc = MockMvcBuilders.standaloneSetup(roundResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        round = new Round();
        round.setName(DEFAULT_NAME);
        round.setDate(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createRound() throws Exception {
        int databaseSizeBeforeCreate = roundRepository.findAll().size();

        // Create the Round

        restRoundMockMvc.perform(post("/api/rounds")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(round)))
                .andExpect(status().isCreated());

        // Validate the Round in the database
        List<Round> rounds = roundRepository.findAll();
        assertThat(rounds).hasSize(databaseSizeBeforeCreate + 1);
        Round testRound = rounds.get(rounds.size() - 1);
        assertThat(testRound.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRound.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void getAllRounds() throws Exception {
        // Initialize the database
        roundRepository.saveAndFlush(round);

        // Get all the rounds
        restRoundMockMvc.perform(get("/api/rounds?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(round.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE_STR)));
    }

    @Test
    @Transactional
    public void getRound() throws Exception {
        // Initialize the database
        roundRepository.saveAndFlush(round);

        // Get the round
        restRoundMockMvc.perform(get("/api/rounds/{id}", round.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(round.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE_STR));
    }

    @Test
    @Transactional
    public void getNonExistingRound() throws Exception {
        // Get the round
        restRoundMockMvc.perform(get("/api/rounds/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRound() throws Exception {
        // Initialize the database
        roundRepository.saveAndFlush(round);
        int databaseSizeBeforeUpdate = roundRepository.findAll().size();

        // Update the round
        Round updatedRound = new Round();
        updatedRound.setId(round.getId());
        updatedRound.setName(UPDATED_NAME);
        updatedRound.setDate(UPDATED_DATE);

        restRoundMockMvc.perform(put("/api/rounds")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedRound)))
                .andExpect(status().isOk());

        // Validate the Round in the database
        List<Round> rounds = roundRepository.findAll();
        assertThat(rounds).hasSize(databaseSizeBeforeUpdate);
        Round testRound = rounds.get(rounds.size() - 1);
        assertThat(testRound.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRound.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void deleteRound() throws Exception {
        // Initialize the database
        roundRepository.saveAndFlush(round);
        int databaseSizeBeforeDelete = roundRepository.findAll().size();

        // Get the round
        restRoundMockMvc.perform(delete("/api/rounds/{id}", round.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Round> rounds = roundRepository.findAll();
        assertThat(rounds).hasSize(databaseSizeBeforeDelete - 1);
    }
}
