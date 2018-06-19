import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IEquipment } from './equipment';
import { IActivity } from './iactivity';

@Injectable()
export class EquipmentService {
    private _baseUrl = 'http://localhost:59629/api';
    
    constructor(private _http: HttpClient) { }

    getEquipments(): Observable<any> {
        var _equipmentUrl = this._baseUrl + '/Equipment';
        return this._http.get<IEquipment[]>(_equipmentUrl)
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getEquipmentActivities(equipment: any): Observable<any> {
        let requestOptions = new RequestOptions({ headers:null, withCredentials: 
            true });
        var url = this._baseUrl + '/Equipment/Activities/' + equipment['id'];
        console.log(url);

        return this._http.get<IActivity[]>(url)
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            // .catch(this.handleError);
            ;
    }

    getEquipment(id: number): Observable<IEquipment> {
        return this.getEquipments()
            .map((equipments: IEquipment[]) => equipments.find(p => p.id === id));
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
