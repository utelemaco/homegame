package com.utelemaco.repository;

import com.utelemaco.domain.Score;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Score entity.
 */
public interface ScoreRepository extends JpaRepository<Score,Long> {

    @Query("select score from Score score where score.user.login = ?#{principal.username}")
    List<Score> findByUserIsCurrentUser();

}
