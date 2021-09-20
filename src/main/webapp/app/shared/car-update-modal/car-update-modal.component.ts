import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'app/entities/car';
import { Observable } from 'rxjs';
import { Car, ICar } from '../model/car.model';

@Component({
    selector: 'jhi-car-update-modal',
    templateUrl: './car-update-modal.component.html'
})
export class CarUpdateModalComponent implements OnInit, AfterViewInit {
    @Input()
    inputCar: ICar;
    car: ICar;
    isSaving: boolean;
    files: FileList;

    constructor(private carService: CarService, private activeModal: NgbActiveModal) {}

    ngAfterViewInit(): void {}
    ngOnInit() {
        this.isSaving = false;
        this.car = new Car();
        if (this.inputCar !== undefined) {
            this.car = { ...this.inputCar };
            // this.car = this.inputCar;
        }
    }
    setCar(car: ICar): void {
        this.car = car;
    }
    handleFileInput(files: FileList) {
        this.files = files;
    }

    save() {
        this.isSaving = true;
        if (this.car.id !== undefined) {
            this.subscribeToSaveResponse(this.carService.update(this.car));
        } else {
            // this.subscribeToSaveResponse(this.carService.createV2(this.car, this.files));
            this.subscribeToSaveResponse(this.carService.create(this.car));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>) {
        result.subscribe((res: HttpResponse<ICar>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.activeModal.dismiss('save');
        window.location.reload();
    }

    private onSaveError() {
        this.isSaving = false;
        window.location.reload();
    }
}
