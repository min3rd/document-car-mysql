export interface IDocumentContentCar {
    id?: number;
    title?: string;
    content?: string;
}

export class DocumentContentCar implements IDocumentContentCar {
    constructor(public id?: number, public title?: string, public content?: string) {}
}
