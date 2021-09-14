package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.DocumentCarMysqlApp;

import io.github.jhipster.application.domain.DocumentContentCar;
import io.github.jhipster.application.repository.DocumentContentCarRepository;
import io.github.jhipster.application.service.DocumentContentCarService;
import io.github.jhipster.application.service.dto.DocumentContentCarDTO;
import io.github.jhipster.application.service.mapper.DocumentContentCarMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DocumentContentCarResource REST controller.
 *
 * @see DocumentContentCarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DocumentCarMysqlApp.class)
public class DocumentContentCarResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private DocumentContentCarRepository documentContentCarRepository;

    @Autowired
    private DocumentContentCarMapper documentContentCarMapper;

    @Autowired
    private DocumentContentCarService documentContentCarService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentContentCarMockMvc;

    private DocumentContentCar documentContentCar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentContentCarResource documentContentCarResource = new DocumentContentCarResource(documentContentCarService);
        this.restDocumentContentCarMockMvc = MockMvcBuilders.standaloneSetup(documentContentCarResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentContentCar createEntity(EntityManager em) {
        DocumentContentCar documentContentCar = new DocumentContentCar()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT);
        return documentContentCar;
    }

    @Before
    public void initTest() {
        documentContentCar = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentContentCar() throws Exception {
        int databaseSizeBeforeCreate = documentContentCarRepository.findAll().size();

        // Create the DocumentContentCar
        DocumentContentCarDTO documentContentCarDTO = documentContentCarMapper.toDto(documentContentCar);
        restDocumentContentCarMockMvc.perform(post("/api/document-content-cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContentCarDTO)))
            .andExpect(status().isCreated());

        // Validate the DocumentContentCar in the database
        List<DocumentContentCar> documentContentCarList = documentContentCarRepository.findAll();
        assertThat(documentContentCarList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentContentCar testDocumentContentCar = documentContentCarList.get(documentContentCarList.size() - 1);
        assertThat(testDocumentContentCar.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testDocumentContentCar.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createDocumentContentCarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentContentCarRepository.findAll().size();

        // Create the DocumentContentCar with an existing ID
        documentContentCar.setId(1L);
        DocumentContentCarDTO documentContentCarDTO = documentContentCarMapper.toDto(documentContentCar);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentContentCarMockMvc.perform(post("/api/document-content-cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContentCarDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentContentCar in the database
        List<DocumentContentCar> documentContentCarList = documentContentCarRepository.findAll();
        assertThat(documentContentCarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentContentCars() throws Exception {
        // Initialize the database
        documentContentCarRepository.saveAndFlush(documentContentCar);

        // Get all the documentContentCarList
        restDocumentContentCarMockMvc.perform(get("/api/document-content-cars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentContentCar.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getDocumentContentCar() throws Exception {
        // Initialize the database
        documentContentCarRepository.saveAndFlush(documentContentCar);

        // Get the documentContentCar
        restDocumentContentCarMockMvc.perform(get("/api/document-content-cars/{id}", documentContentCar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentContentCar.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentContentCar() throws Exception {
        // Get the documentContentCar
        restDocumentContentCarMockMvc.perform(get("/api/document-content-cars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentContentCar() throws Exception {
        // Initialize the database
        documentContentCarRepository.saveAndFlush(documentContentCar);

        int databaseSizeBeforeUpdate = documentContentCarRepository.findAll().size();

        // Update the documentContentCar
        DocumentContentCar updatedDocumentContentCar = documentContentCarRepository.findById(documentContentCar.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentContentCar are not directly saved in db
        em.detach(updatedDocumentContentCar);
        updatedDocumentContentCar
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);
        DocumentContentCarDTO documentContentCarDTO = documentContentCarMapper.toDto(updatedDocumentContentCar);

        restDocumentContentCarMockMvc.perform(put("/api/document-content-cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContentCarDTO)))
            .andExpect(status().isOk());

        // Validate the DocumentContentCar in the database
        List<DocumentContentCar> documentContentCarList = documentContentCarRepository.findAll();
        assertThat(documentContentCarList).hasSize(databaseSizeBeforeUpdate);
        DocumentContentCar testDocumentContentCar = documentContentCarList.get(documentContentCarList.size() - 1);
        assertThat(testDocumentContentCar.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testDocumentContentCar.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentContentCar() throws Exception {
        int databaseSizeBeforeUpdate = documentContentCarRepository.findAll().size();

        // Create the DocumentContentCar
        DocumentContentCarDTO documentContentCarDTO = documentContentCarMapper.toDto(documentContentCar);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentContentCarMockMvc.perform(put("/api/document-content-cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContentCarDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentContentCar in the database
        List<DocumentContentCar> documentContentCarList = documentContentCarRepository.findAll();
        assertThat(documentContentCarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentContentCar() throws Exception {
        // Initialize the database
        documentContentCarRepository.saveAndFlush(documentContentCar);

        int databaseSizeBeforeDelete = documentContentCarRepository.findAll().size();

        // Get the documentContentCar
        restDocumentContentCarMockMvc.perform(delete("/api/document-content-cars/{id}", documentContentCar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentContentCar> documentContentCarList = documentContentCarRepository.findAll();
        assertThat(documentContentCarList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentContentCar.class);
        DocumentContentCar documentContentCar1 = new DocumentContentCar();
        documentContentCar1.setId(1L);
        DocumentContentCar documentContentCar2 = new DocumentContentCar();
        documentContentCar2.setId(documentContentCar1.getId());
        assertThat(documentContentCar1).isEqualTo(documentContentCar2);
        documentContentCar2.setId(2L);
        assertThat(documentContentCar1).isNotEqualTo(documentContentCar2);
        documentContentCar1.setId(null);
        assertThat(documentContentCar1).isNotEqualTo(documentContentCar2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentContentCarDTO.class);
        DocumentContentCarDTO documentContentCarDTO1 = new DocumentContentCarDTO();
        documentContentCarDTO1.setId(1L);
        DocumentContentCarDTO documentContentCarDTO2 = new DocumentContentCarDTO();
        assertThat(documentContentCarDTO1).isNotEqualTo(documentContentCarDTO2);
        documentContentCarDTO2.setId(documentContentCarDTO1.getId());
        assertThat(documentContentCarDTO1).isEqualTo(documentContentCarDTO2);
        documentContentCarDTO2.setId(2L);
        assertThat(documentContentCarDTO1).isNotEqualTo(documentContentCarDTO2);
        documentContentCarDTO1.setId(null);
        assertThat(documentContentCarDTO1).isNotEqualTo(documentContentCarDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(documentContentCarMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(documentContentCarMapper.fromId(null)).isNull();
    }
}
