export class ErrorResponseCreator {
    response: string;
    statusCode: number;

    constructor() {
        this.response = 'Something went wrong';
        this.statusCode = 500;
    }
}