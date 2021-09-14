package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.DocumentContentCarDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DocumentContentCar and its DTO DocumentContentCarDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DocumentContentCarMapper extends EntityMapper<DocumentContentCarDTO, DocumentContentCar> {



    default DocumentContentCar fromId(Long id) {
        if (id == null) {
            return null;
        }
        DocumentContentCar documentContentCar = new DocumentContentCar();
        documentContentCar.setId(id);
        return documentContentCar;
    }
}
