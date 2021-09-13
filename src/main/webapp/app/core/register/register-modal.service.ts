import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiRegisterModalComponent } from 'app/shared/register/register.component';

@Injectable({
    providedIn: 'root'
})
export class RegisterModalService {
    isOpen = false;
    constructor(private modalService: NgbModal) {}

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(JhiRegisterModalComponent);
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
