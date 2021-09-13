import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarUpdateModalComponent } from 'app/shared';
import { ICar } from 'app/shared/model/car.model';

@Injectable({
    providedIn: 'root'
})
export class CarUpdateModalService {
    isOpen = false;
    constructor(private modalService: NgbModal) {}
    open(car?: ICar | undefined): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        const modalRef = this.modalService.open(CarUpdateModalComponent);
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
