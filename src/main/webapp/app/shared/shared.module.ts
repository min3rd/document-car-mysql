import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    DocumentCarMysqlSharedLibsModule,
    DocumentCarMysqlSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    JhiRegisterModalComponent,
    CarUpdateModalComponent,
    CarViewModalComponent
} from './';

@NgModule({
    imports: [DocumentCarMysqlSharedLibsModule, DocumentCarMysqlSharedCommonModule],
    declarations: [
        JhiLoginModalComponent,
        JhiRegisterModalComponent,
        CarUpdateModalComponent,
        HasAnyAuthorityDirective,
        CarViewModalComponent,
        CarViewModalComponent
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent, JhiRegisterModalComponent, CarUpdateModalComponent, CarViewModalComponent],
    exports: [
        DocumentCarMysqlSharedCommonModule,
        JhiLoginModalComponent,
        JhiRegisterModalComponent,
        CarUpdateModalComponent,
        HasAnyAuthorityDirective,
        CarViewModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentCarMysqlSharedModule {
    static forRoot() {
        return {
            ngModule: DocumentCarMysqlSharedModule
        };
    }
}
