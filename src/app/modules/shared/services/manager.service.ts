import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { ExceptionHandlerService } from './exception-handler.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'is-what';
// import { ExpiredSessionError } from 'src/errors/expired-session';
// import { BankingCoreError } from 'src/errors/banking-core-error';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    protected lastRequest: any;
    protected lastResponse: any;
    protected headers: any;

    /**
     * @param http
     * @param errorHandler
     */
    constructor(protected http: HttpClient) {
        this.lastRequest = {};
        this.lastResponse = {};
        this.headers = {};
    }

    /**
     * Execute POST request
     *
     * @param params
     * @param url
     * @returns {any}
     */
    protected executePost(params: any, url = environment.URL): Observable<any> {
        this.lastRequest = params;

        return this.http.post(
            url,
            params,
            {
                observe: 'response',
                headers: this.getHeaders()
            },
        ).pipe(
            map((response: any) => {
                //set last response
                this.lastResponse = response;
                if (isNullOrUndefined(response)) {
                    response = { status: HttpStatusCode.InternalServerError, body: { error_message: 'Error null or undefined' } };
                }
                if (typeof response.body === 'object') {
                    return response.body;
                } else {
                    const error = new Error(response.body.error_message);
                    error.name = response.body.error_code;
                    throw error;
                }

            }),
            catchError((err: HttpErrorResponse) => {
                // switch (err.status) {
                //     case HttpStatusCode.InternalServerError:
                //         // throw new BankingCoreError(err.error);
                //     case HttpStatusCode.Unauthorized:
                //         throw err;
                // }
                // return this.errorHandler.catchException(err);
                throw err;
            })
        );
    }

    /**
     * Execute GET request
     *
     * @param params
     * @param url
     * @returns {any}
     */
    protected executeGet(url = environment.URL): Observable<any> {
        return this.http.get(
            url,
            {
                observe: 'response',
                headers: this.getHeaders()
            },
        ).pipe(
            map((response: any) => {
                //set last response
                this.lastResponse = response;
                if (isNullOrUndefined(response)) {
                    response = { status: HttpStatusCode.InternalServerError, body: { error_message: 'Error null or undefined' } };
                }
                if (typeof response.body === 'object') {
                    return response.body;
                } else {
                    const error = new Error(response.body.error_message);
                    error.name = response.body.error_code;
                    throw error;
                }

            }),
            catchError((err: HttpErrorResponse) => {
                // switch (err.status) {
                //     // case HttpStatusCode.InternalServerError:
                //     //     // throw new BankingCoreError(err.error);
                //     // case HttpStatusCode.Unauthorized:
                //     //     throw err;
                // }
                throw err;
            })
        );
    }

    /**
     * Get response status
     *
     * @returns {null}
     */
    protected getResponseStatus(): any {
        return this.lastResponse.status || false;
    }

    /**
     * Get last response
     *
     * @returns {any|null}
     */
    protected getLastResponse(): any {
        return this.lastResponse || null;
    }

    /**
     * Add headers tu array
     */
    protected addHeader(key: string, value: string): any {
        this.headers[key] = value;
    }

    /**
     * Get request headers
     *
     * @returns {{headers: HttpHeaders}}
     */
    protected getHeaders(): any {
        return new HttpHeaders(this.headers);
    }
}