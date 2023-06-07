import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiService {
  constructor(private _http: HttpClient) {}

  postAddTransaction(transaction: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `http://localhost:8080/api/transacciones/add-transaction`,
      transaction,
      httpOption
    );
  }

  getTransactions(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.get(
      `http://localhost:8080/api/transacciones/get-transactions`,
      httpOption
    );
  }

  getTransactionsByCurrency(
    currencyOrigen: string,
    currencyDestino: string
  ): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.get(
      `http://localhost:8080/api/transacciones/get-currency-transactions?currencyOrigen=${currencyOrigen}&currencyDestino=${currencyDestino}`,
      httpOption
    );
  }
}
