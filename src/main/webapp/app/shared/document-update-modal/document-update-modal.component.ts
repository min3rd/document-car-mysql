import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { Document, IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';
import { IContent } from 'app/shared/model/content.model';
import { ContentService } from 'app/entities/content';
import { ICar } from 'app/shared/model/car.model';
import { CarService } from 'app/entities/car';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-document-update-modal',
    templateUrl: './document-update-modal.component.html'
})
export class DocumentUpdateModalComponent implements OnInit {
    @Input()
    inputDocument?: IDocument | undefined;
    document: IDocument;
    isSaving: boolean;

    contents: IContent[];

    cars: ICar[];
    constructor(
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentService,
        private contentService: ContentService,
        private carService: CarService,
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
        this.isSaving = false;
        // this.activatedRoute.data.subscribe(({ document }) => {
        //   this.document = document;
        // });
        this.document = new Document();
        if (this.inputDocument !== undefined) {
            this.document = this.inputDocument;
        }
        this.contentService.query({ filter: 'document(id)-is-null' }).subscribe(
            (res: HttpResponse<IContent[]>) => {
                if (!this.document.content || !this.document.content.id) {
                    this.contents = res.body;
                } else {
                    this.contentService.find(this.document.content.id).subscribe(
                        (subRes: HttpResponse<IContent>) => {
                            this.contents = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.carService.query().subscribe(
            (res: HttpResponse<ICar[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContentById(index: number, item: IContent) {
        return item.id;
    }

    trackCarById(index: number, item: ICar) {
        return item.id;
    }
}
