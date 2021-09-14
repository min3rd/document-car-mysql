package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.DocumentContentCar;
import io.github.jhipster.application.repository.DocumentContentCarRepository;
import io.github.jhipster.application.service.dto.DocumentContentCarDTO;
import io.github.jhipster.application.service.mapper.DocumentContentCarMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing DocumentContentCar.
 */
@Service
@Transactional
public class DocumentContentCarService {

    private final Logger log = LoggerFactory.getLogger(DocumentContentCarService.class);

    private final DocumentContentCarRepository documentContentCarRepository;

    private final DocumentContentCarMapper documentContentCarMapper;

    public DocumentContentCarService(DocumentContentCarRepository documentContentCarRepository, DocumentContentCarMapper documentContentCarMapper) {
        this.documentContentCarRepository = documentContentCarRepository;
        this.documentContentCarMapper = documentContentCarMapper;
    }

    /**
     * Save a documentContentCar.
     *
     * @param documentContentCarDTO the entity to save
     * @return the persisted entity
     */
    public DocumentContentCarDTO save(DocumentContentCarDTO documentContentCarDTO) {
        log.debug("Request to save DocumentContentCar : {}", documentContentCarDTO);

        DocumentContentCar documentContentCar = documentContentCarMapper.toEntity(documentContentCarDTO);
        documentContentCar = documentContentCarRepository.save(documentContentCar);
        return documentContentCarMapper.toDto(documentContentCar);
    }

    /**
     * Get all the documentContentCars.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DocumentContentCarDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DocumentContentCars");
        return documentContentCarRepository.findAll(pageable)
            .map(documentContentCarMapper::toDto);
    }


    /**
     * Get one documentContentCar by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DocumentContentCarDTO> findOne(Long id) {
        log.debug("Request to get DocumentContentCar : {}", id);
        return documentContentCarRepository.findById(id)
            .map(documentContentCarMapper::toDto);
    }

    /**
     * Delete the documentContentCar by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DocumentContentCar : {}", id);
        documentContentCarRepository.deleteById(id);
    }
}
