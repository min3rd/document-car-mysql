/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { DocumentContentCarDetailComponent } from 'app/entities/document-content-car/document-content-car-detail.component';
import { DocumentContentCar } from 'app/shared/model/document-content-car.model';

describe('Component Tests', () => {
    describe('DocumentContentCar Management Detail Component', () => {
        let comp: DocumentContentCarDetailComponent;
        let fixture: ComponentFixture<DocumentContentCarDetailComponent>;
        const route = ({ data: of({ documentContentCar: new DocumentContentCar(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [DocumentContentCarDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentContentCarDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentContentCarDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documentContentCar).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
