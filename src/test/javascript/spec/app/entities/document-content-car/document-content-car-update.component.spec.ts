/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { DocumentContentCarUpdateComponent } from 'app/entities/document-content-car/document-content-car-update.component';
import { DocumentContentCarService } from 'app/entities/document-content-car/document-content-car.service';
import { DocumentContentCar } from 'app/shared/model/document-content-car.model';

describe('Component Tests', () => {
    describe('DocumentContentCar Management Update Component', () => {
        let comp: DocumentContentCarUpdateComponent;
        let fixture: ComponentFixture<DocumentContentCarUpdateComponent>;
        let service: DocumentContentCarService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [DocumentContentCarUpdateComponent]
            })
                .overrideTemplate(DocumentContentCarUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentContentCarUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentContentCarService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DocumentContentCar(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.documentContentCar = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DocumentContentCar();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.documentContentCar = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
