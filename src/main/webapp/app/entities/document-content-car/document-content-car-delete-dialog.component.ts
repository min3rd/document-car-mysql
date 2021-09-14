import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentContentCar } from 'app/shared/model/document-content-car.model';
import { DocumentContentCarService } from './document-content-car.service';

@Component({
    selector: 'jhi-document-content-car-delete-dialog',
    templateUrl: './document-content-car-delete-dialog.component.html'
})
export class DocumentContentCarDeleteDialogComponent {
    documentContentCar: IDocumentContentCar;

    constructor(
        private documentContentCarService: DocumentContentCarService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentContentCarService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentContentCarListModification',
                content: 'Deleted an documentContentCar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-content-car-delete-popup',
    template: ''
})
export class DocumentContentCarDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentContentCar }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentContentCarDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentContentCar = documentContentCar;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
