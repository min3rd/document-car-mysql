import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DocumentUpdateModalComponent } from 'app/shared';
import { IDocument } from 'app/shared/model/document.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentUpdateModalService {
    isOpen = false;
    constructor(private modalService: NgbModal) {}
    open(document?: IDocument | undefined): NgbModalRef {
        if (this.isOpen) {
            return;
        }

        const modalRef = this.modalService.open(DocumentUpdateModalComponent);
        if (document !== undefined) {
            modalRef.componentInstance.inputDocument = document;
        }

        modalRef.result.then(
            result => {
                this.isOpen = false;
            },
            reason => {
                this.isOpen = false;
            }
        );
        return modalRef;
    }
}
