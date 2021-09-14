import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentContentCar } from 'app/shared/model/document-content-car.model';
import { DocumentContentCarService } from './document-content-car.service';
import { DocumentContentCarComponent } from './document-content-car.component';
import { DocumentContentCarDetailComponent } from './document-content-car-detail.component';
import { DocumentContentCarUpdateComponent } from './document-content-car-update.component';
import { DocumentContentCarDeletePopupComponent } from './document-content-car-delete-dialog.component';
import { IDocumentContentCar } from 'app/shared/model/document-content-car.model';

@Injectable({ providedIn: 'root' })
export class DocumentContentCarResolve implements Resolve<IDocumentContentCar> {
    constructor(private service: DocumentContentCarService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentContentCar> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentContentCar>) => response.ok),
                map((documentContentCar: HttpResponse<DocumentContentCar>) => documentContentCar.body)
            );
        }
        return of(new DocumentContentCar());
    }
}

export const documentContentCarRoute: Routes = [
    {
        path: 'document-content-car',
        component: DocumentContentCarComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'DocumentContentCars'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-content-car/:id/view',
        component: DocumentContentCarDetailComponent,
        resolve: {
            documentContentCar: DocumentContentCarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentContentCars'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-content-car/new',
        component: DocumentContentCarUpdateComponent,
        resolve: {
            documentContentCar: DocumentContentCarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentContentCars'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-content-car/:id/edit',
        component: DocumentContentCarUpdateComponent,
        resolve: {
            documentContentCar: DocumentContentCarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentContentCars'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentContentCarPopupRoute: Routes = [
    {
        path: 'document-content-car/:id/delete',
        component: DocumentContentCarDeletePopupComponent,
        resolve: {
            documentContentCar: DocumentContentCarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentContentCars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
