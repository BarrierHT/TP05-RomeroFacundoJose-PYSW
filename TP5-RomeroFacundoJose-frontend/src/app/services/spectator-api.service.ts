import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpectatorApiService {
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  //*Select, insert, update, delete

  getSpectators(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.get(
      `http://localhost:8080/api/espectadores/get-spectators`,
      httpOption
    );
  }
}
