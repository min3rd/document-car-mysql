import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentUpdateModalComponent } from 'app/shared';
import { IContent } from 'app/shared/model/content.model';

@Injectable({
    providedIn: 'root'
})
export class ContentUpdateModalService {
    isOpen = false;
    constructor(private modalService: NgbModal) {}

    open(content?: IContent | undefined): NgbModalRef {
        if (this.isOpen) {
            return;
        }

        const modalRef = this.modalService.open(ContentUpdateModalComponent);
        if (content !== undefined) {
            modalRef.componentInstance.inputContent = content;
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
