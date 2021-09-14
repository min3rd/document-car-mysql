import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDocumentContentCar } from 'app/shared/model/document-content-car.model';
import { DocumentContentCarService } from './document-content-car.service';

@Component({
    selector: 'jhi-document-content-car-update',
    templateUrl: './document-content-car-update.component.html'
})
export class DocumentContentCarUpdateComponent implements OnInit {
    documentContentCar: IDocumentContentCar;
    isSaving: boolean;

    constructor(private documentContentCarService: DocumentContentCarService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ documentContentCar }) => {
            this.documentContentCar = documentContentCar;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.documentContentCar.id !== undefined) {
            this.subscribeToSaveResponse(this.documentContentCarService.update(this.documentContentCar));
        } else {
            this.subscribeToSaveResponse(this.documentContentCarService.create(this.documentContentCar));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentContentCar>>) {
        result.subscribe((res: HttpResponse<IDocumentContentCar>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
