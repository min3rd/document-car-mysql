import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';

import { Car, ICar } from 'app/shared/model/car.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarUpdateModalService } from 'app/core';

@Component({
    selector: 'jhi-car-detail-modal',
    templateUrl: './car-view-modal.component.html'
})
export class CarViewModalComponent implements OnInit, AfterViewInit {
    @Input()
    inputCar;
    car: ICar;
    modalRef: NgbModalRef;
    constructor(
        private documentService: DocumentService,
        private activeModal: NgbActiveModal,
        private carUpdateModalService: CarUpdateModalService
    ) {}
    ngAfterViewInit(): void {}

    ngOnInit() {
        this.car = new Car();
        if (this.inputCar !== undefined) {
            // this.car = {...this.inputCar};
            this.car = this.inputCar;
        }
    }

    downloadDocument(document: IDocument) {
        this.documentService.download(document.id).subscribe(file => {
            FileSaver.saveAs(file, document.title);
        });
    }

    openUpdate(car?: ICar | undefined): void {
        this.activeModal.dismiss('open Edit');
        this.modalRef = this.carUpdateModalService.open(car);
    }
}
