/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { DocumentContentCarDeleteDialogComponent } from 'app/entities/document-content-car/document-content-car-delete-dialog.component';
import { DocumentContentCarService } from 'app/entities/document-content-car/document-content-car.service';

describe('Component Tests', () => {
    describe('DocumentContentCar Management Delete Component', () => {
        let comp: DocumentContentCarDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentContentCarDeleteDialogComponent>;
        let service: DocumentContentCarService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [DocumentContentCarDeleteDialogComponent]
            })
                .overrideTemplate(DocumentContentCarDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentContentCarDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentContentCarService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
