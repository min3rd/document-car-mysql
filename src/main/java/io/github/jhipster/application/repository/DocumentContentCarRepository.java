package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DocumentContentCar;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentContentCar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentContentCarRepository extends JpaRepository<DocumentContentCar, Long> {

}
