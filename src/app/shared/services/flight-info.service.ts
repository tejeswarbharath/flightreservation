import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { FlightInfoPayload } from '../FlightInfoPayload';

@Injectable({
  providedIn: 'root'
})
export class FlightInfoService {

  constructor(public httpClient: HttpClient) { }

  submitFlightInfo(flightInfoPayload:FlightInfoPayload): Observable<any> {
    const url = `${environment.flightInfo}`;
    const user = JSON.parse(localStorage.getItem('user')|| '{}')
    const headers = { 'content-type': 'application/json',"token":"SGV5IHRoZXJlIFRlamVzd2FyISAgTG9va3MgbGlrZSB5b3UgZm91bmQgbXkgbGl0dGxlIGVhc3RlciBlZ2cuIEJyaW5nIHRoaXMgdXAgaW4gdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzISEh"}  
    return this.httpClient.post(url,JSON.stringify(flightInfoPayload),{headers:headers});
  }
    
}
