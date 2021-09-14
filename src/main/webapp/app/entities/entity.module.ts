import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DocumentCarMysqlCarModule } from './car/car.module';
import { DocumentCarMysqlDocumentModule } from './document/document.module';
import { DocumentCarMysqlContentModule } from './content/content.module';
import { DocumentCarMysqlDocumentContentCarModule } from './document-content-car/document-content-car.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DocumentCarMysqlCarModule,
        DocumentCarMysqlDocumentModule,
        DocumentCarMysqlContentModule,
        DocumentCarMysqlDocumentContentCarModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentCarMysqlEntityModule {}
