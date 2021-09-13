import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICar } from 'app/shared/model/car.model';
import { Principal } from 'app/core';
import { CarService } from './car.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarUpdateModalService } from 'app/core/car/car-update-modal.service';
import { CarViewModalComponent } from 'app/shared';
import { CarViewModalService } from 'app/core/car/car-view-modal.service';

@Component({
    selector: 'jhi-car',
    templateUrl: './car.component.html'
})
export class CarComponent implements OnInit, OnDestroy {
    cars: ICar[];
    currentAccount: any;
    eventSubscriber: Subscription;
    modalRef: NgbModalRef;
    constructor(
        private carService: CarService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private carUpdateModalService: CarUpdateModalService,
        private carViewModalService: CarViewModalService
    ) {}

    loadAll() {
        this.carService.query().subscribe(
            (res: HttpResponse<ICar[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICar) {
        return item.id;
    }

    registerChangeInCars() {
        this.eventSubscriber = this.eventManager.subscribe('carListModification', response => this.loadAll());
    }
    openCreate(): void {
        this.modalRef = this.carUpdateModalService.open();
    }
    openUpdate(car: ICar): void {
        this.modalRef = this.carUpdateModalService.open(car);
    }

    openView(car: ICar): void {
        this.modalRef = this.carViewModalService.open(car);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
