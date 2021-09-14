package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.DocumentContentCarService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.DocumentContentCarDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DocumentContentCar.
 */
@RestController
@RequestMapping("/api")
public class DocumentContentCarResource {

    private final Logger log = LoggerFactory.getLogger(DocumentContentCarResource.class);

    private static final String ENTITY_NAME = "documentContentCar";

    private final DocumentContentCarService documentContentCarService;

    public DocumentContentCarResource(DocumentContentCarService documentContentCarService) {
        this.documentContentCarService = documentContentCarService;
    }

    /**
     * POST  /document-content-cars : Create a new documentContentCar.
     *
     * @param documentContentCarDTO the documentContentCarDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentContentCarDTO, or with status 400 (Bad Request) if the documentContentCar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-content-cars")
    @Timed
    public ResponseEntity<DocumentContentCarDTO> createDocumentContentCar(@RequestBody DocumentContentCarDTO documentContentCarDTO) throws URISyntaxException {
        log.debug("REST request to save DocumentContentCar : {}", documentContentCarDTO);
        if (documentContentCarDTO.getId() != null) {
            throw new BadRequestAlertException("A new documentContentCar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentContentCarDTO result = documentContentCarService.save(documentContentCarDTO);
        return ResponseEntity.created(new URI("/api/document-content-cars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-content-cars : Updates an existing documentContentCar.
     *
     * @param documentContentCarDTO the documentContentCarDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentContentCarDTO,
     * or with status 400 (Bad Request) if the documentContentCarDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentContentCarDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-content-cars")
    @Timed
    public ResponseEntity<DocumentContentCarDTO> updateDocumentContentCar(@RequestBody DocumentContentCarDTO documentContentCarDTO) throws URISyntaxException {
        log.debug("REST request to update DocumentContentCar : {}", documentContentCarDTO);
        if (documentContentCarDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentContentCarDTO result = documentContentCarService.save(documentContentCarDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentContentCarDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-content-cars : get all the documentContentCars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of documentContentCars in body
     */
    @GetMapping("/document-content-cars")
    @Timed
    public ResponseEntity<List<DocumentContentCarDTO>> getAllDocumentContentCars(Pageable pageable) {
        log.debug("REST request to get a page of DocumentContentCars");
        Page<DocumentContentCarDTO> page = documentContentCarService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/document-content-cars");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /document-content-cars/:id : get the "id" documentContentCar.
     *
     * @param id the id of the documentContentCarDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentContentCarDTO, or with status 404 (Not Found)
     */
    @GetMapping("/document-content-cars/{id}")
    @Timed
    public ResponseEntity<DocumentContentCarDTO> getDocumentContentCar(@PathVariable Long id) {
        log.debug("REST request to get DocumentContentCar : {}", id);
        Optional<DocumentContentCarDTO> documentContentCarDTO = documentContentCarService.findOne(id);
        return ResponseUtil.wrapOrNotFound(documentContentCarDTO);
    }

    /**
     * DELETE  /document-content-cars/:id : delete the "id" documentContentCar.
     *
     * @param id the id of the documentContentCarDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-content-cars/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentContentCar(@PathVariable Long id) {
        log.debug("REST request to delete DocumentContentCar : {}", id);
        documentContentCarService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
