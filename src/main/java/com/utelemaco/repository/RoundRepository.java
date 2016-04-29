package com.utelemaco.repository;

import com.utelemaco.domain.Round;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Round entity.
 */
public interface RoundRepository extends JpaRepository<Round,Long> {

}
