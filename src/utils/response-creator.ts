export class ResponseCreator {

    response: string | any[];
    statusCode: number;


    constructor(response: string | any[], statusCode: number) {
        this.response = response
        this.statusCode = statusCode
    };

};
