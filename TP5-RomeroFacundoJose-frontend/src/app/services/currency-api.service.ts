import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  constructor(private _http: HttpClient) {}

  public getCurrencies(
    base_currency: string,
    currencies: string
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
    //https://freecurrencyapi.com/docs/historical#request-parameters
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=93iFJUUjbrh0Nj7JwLmFgEYfqBmzU2tdaWHDVw1Q&base_currency=${base_currency}&currencies=${currencies}`;

    return this._http.get(apiUrl, httpOptions);
  }

  public convertCurrency(
    base_currency: string,
    qtyCurrency: string,
    finalBaseCurrency: string
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '4e47861337mshe1f0ee70eec1fbfp1dc9ecjsn6a3497c7eefc',
        'X-RapidAPI-Host':
          'community-neutrino-currency-conversion.p.rapidapi.com',
      }),
    };

    //cambiar Api Key

    const body = new HttpParams()
      .set('from-value', qtyCurrency)
      .set('from-type', base_currency)
      .set('to-type', finalBaseCurrency);
    return this._http.post(
      'https://community-neutrino-currency-conversion.p.rapidapi.com/convert',
      body,
      httpOptions
    );
  }
}
