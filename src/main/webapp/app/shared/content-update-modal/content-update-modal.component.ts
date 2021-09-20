import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Content, IContent } from 'app/shared/model/content.model';
import { ContentService } from 'app/entities/content/content.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-content-update-modal',
    templateUrl: './content-update-modal.component.html'
})
export class ContentUpdateModalComponent implements OnInit {
    content: IContent;
    isSaving: boolean;
    @Input()
    inputContent?: IContent | undefined;
    documents: IDocument[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private contentService: ContentService,
        private documentService: DocumentService,
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
        this.isSaving = false;
        // this.activatedRoute.data.subscribe(({ content }) => {
        //   this.content = content;
        // });
        this.content = new Content();
        if (this.inputContent !== undefined) {
            this.content = { ...this.inputContent };
        }
        this.documentService.query().subscribe(
            (res: HttpResponse<IDocument[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.content.id !== undefined) {
            this.subscribeToSaveResponse(this.contentService.update(this.content));
        } else {
            this.subscribeToSaveResponse(this.contentService.create(this.content));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContent>>) {
        result.subscribe((res: HttpResponse<IContent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
        this.activeModal.dismiss('save');
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }
}
