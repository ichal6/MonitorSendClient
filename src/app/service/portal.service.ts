import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient) { }

  getScreenShot(serverURL: string): Observable<Blob>{
    return this.http.get( serverURL + '/image', { responseType: 'blob' });
  }
}
