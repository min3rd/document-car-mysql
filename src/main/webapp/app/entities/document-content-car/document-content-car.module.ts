import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentCarMysqlSharedModule } from 'app/shared';
import {
    DocumentContentCarComponent,
    DocumentContentCarDetailComponent,
    DocumentContentCarUpdateComponent,
    DocumentContentCarDeletePopupComponent,
    DocumentContentCarDeleteDialogComponent,
    documentContentCarRoute,
    documentContentCarPopupRoute
} from './';

const ENTITY_STATES = [...documentContentCarRoute, ...documentContentCarPopupRoute];

@NgModule({
    imports: [DocumentCarMysqlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentContentCarComponent,
        DocumentContentCarDetailComponent,
        DocumentContentCarUpdateComponent,
        DocumentContentCarDeleteDialogComponent,
        DocumentContentCarDeletePopupComponent
    ],
    entryComponents: [
        DocumentContentCarComponent,
        DocumentContentCarUpdateComponent,
        DocumentContentCarDeleteDialogComponent,
        DocumentContentCarDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentCarMysqlDocumentContentCarModule {}
