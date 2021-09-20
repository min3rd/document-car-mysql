import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { Principal } from 'app/core';
import { DocumentService } from './document.service';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DocumentUpdateModalService } from 'app/core/document/document-update-modal.service';

@Component({
    selector: 'jhi-document',
    templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
    documents: IDocument[];
    currentAccount: any;
    eventSubscriber: Subscription;
    modalRef: NgbModalRef;
    constructor(
        private documentService: DocumentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private documentUpdateModalService: DocumentUpdateModalService
    ) {}

    loadAll() {
        this.documentService.query().subscribe(
            (res: HttpResponse<IDocument[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocument) {
        return item.id;
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    openCreate() {
        this.modalRef = this.documentUpdateModalService.open();
    }
    openEdit(document: IDocument) {
        this.modalRef = this.documentUpdateModalService.open(document);
    }
}
