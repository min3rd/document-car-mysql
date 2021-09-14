import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentContentCar } from 'app/shared/model/document-content-car.model';

@Component({
    selector: 'jhi-document-content-car-detail',
    templateUrl: './document-content-car-detail.component.html'
})
export class DocumentContentCarDetailComponent implements OnInit {
    documentContentCar: IDocumentContentCar;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentContentCar }) => {
            this.documentContentCar = documentContentCar;
        });
    }

    previousState() {
        window.history.back();
    }
}
