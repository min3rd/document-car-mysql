import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarViewModalComponent } from 'app/shared';
import { ICar } from 'app/shared/model/car.model';

@Injectable({
    providedIn: 'root'
})
export class CarViewModalService {
    isOpen = false;
    constructor(private modalService: NgbModal) {}
    open(car?: ICar | undefined): NgbModalRef {
        if (this.isOpen) {
            return;
        }

        const modalRef = this.modalService.open(CarViewModalComponent);
        if (car !== undefined) {
            modalRef.componentInstance.inputCar = car;
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
