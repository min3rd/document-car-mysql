import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentContentCar } from 'app/shared/model/document-content-car.model';

type EntityResponseType = HttpResponse<IDocumentContentCar>;
type EntityArrayResponseType = HttpResponse<IDocumentContentCar[]>;

@Injectable({ providedIn: 'root' })
export class DocumentContentCarService {
    public resourceUrl = SERVER_API_URL + 'api/document-content-cars';

    constructor(private http: HttpClient) {}

    create(documentContentCar: IDocumentContentCar): Observable<EntityResponseType> {
        return this.http.post<IDocumentContentCar>(this.resourceUrl, documentContentCar, { observe: 'response' });
    }

    update(documentContentCar: IDocumentContentCar): Observable<EntityResponseType> {
        return this.http.put<IDocumentContentCar>(this.resourceUrl, documentContentCar, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentContentCar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentContentCar[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
