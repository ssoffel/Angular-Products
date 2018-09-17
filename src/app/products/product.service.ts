import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ObjectUnsubscribedError, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productUrl = 'api/products/products.json';
    constructor(private http: HttpClient){

    }
    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('This is data: ' + JSON.stringify(data))),
            catchError(this.handleError)
        )
    }
    private handleError(err: HttpErrorResponse){
        //In a real world app, we may send the server to some remoate logging: infrasture instead of logging to the console
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            //A client-side or network error occured. Handle it accordingly
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message} `;
        }
        console.error(errorMessage);
        return throwError(errorMessage);

    };
}