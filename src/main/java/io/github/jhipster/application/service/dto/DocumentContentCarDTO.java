package io.github.jhipster.application.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the DocumentContentCar entity.
 */
public class DocumentContentCarDTO implements Serializable {

    private Long id;

    private String title;

    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentContentCarDTO documentContentCarDTO = (DocumentContentCarDTO) o;
        if (documentContentCarDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentContentCarDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentContentCarDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
