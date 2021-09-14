package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Car;
import io.github.jhipster.application.domain.Document;
import io.github.jhipster.application.repository.CarRepository;
import io.github.jhipster.application.service.mapper.DocumentMapper;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Car.
 */
@RestController
@RequestMapping("/test")
public class TestResource {

    private final Logger log = LoggerFactory.getLogger(CarResource.class);

    public TestResource() {

    }

    @GetMapping("/test")
    public void Test(){

    }
}
