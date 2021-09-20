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
    CarViewModalComponent,
    ContentUpdateModalComponent,
    DocumentUpdateModalComponent
} from './';

@NgModule({
    imports: [DocumentCarMysqlSharedLibsModule, DocumentCarMysqlSharedCommonModule],
    declarations: [
        JhiLoginModalComponent,
        JhiRegisterModalComponent,
        CarUpdateModalComponent,
        HasAnyAuthorityDirective,
        CarViewModalComponent,
        CarViewModalComponent,
        ContentUpdateModalComponent,
        DocumentUpdateModalComponent
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [
        JhiLoginModalComponent,
        JhiRegisterModalComponent,
        CarUpdateModalComponent,
        ContentUpdateModalComponent,
        DocumentUpdateModalComponent
    ],
    exports: [
        DocumentCarMysqlSharedCommonModule,
        JhiLoginModalComponent,
        JhiRegisterModalComponent,
        CarUpdateModalComponent,
        HasAnyAuthorityDirective,
        CarViewModalComponent,
        ContentUpdateModalComponent,
        DocumentUpdateModalComponent
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
