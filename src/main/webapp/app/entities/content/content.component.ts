import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IContent } from 'app/shared/model/content.model';
import { Principal } from 'app/core';
import { ContentService } from './content.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentUpdateModalService } from 'app/core/content/content-update-modal.service';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit, OnDestroy {
    contents: IContent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    modalRef: NgbModalRef;
    constructor(
        private contentService: ContentService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private contentModalService: ContentUpdateModalService
    ) {}

    loadAll() {
        this.contentService.query().subscribe(
            (res: HttpResponse<IContent[]>) => {
                this.contents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContent) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe('contentListModification', response => this.loadAll());
    }
    openCreate() {
        this.modalRef = this.contentModalService.open();
    }
    openEdit(content: IContent) {
        this.modalRef = this.contentModalService.open(content);
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
