import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, pipe } from 'rxjs';
import { CurrencyApiService } from 'src/app/services/currency-api.service';
import { TransactionApiService } from 'src/app/services/transaction-api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  convertionCurrency: {
    initialBaseCurrency: string;
    finalBaseCurrency: string;
    resultCurrency: string;
    qtyCurrency: string;
  } = {
    initialBaseCurrency: 'USD',
    finalBaseCurrency: 'EUR',
    qtyCurrency: '',
    resultCurrency: '',
  };

  indexJ: number = 0;
  loading: boolean = true;
  currencies: Array<any>;
  emailClient!: string;

  constructor(
    private currencyApiService: CurrencyApiService,
    private transactionApiService: TransactionApiService
  ) {
    this.currencies = [];
  }

  ngOnInit(): void {
    const observables = [
      this.currencyApiService.getCurrencies('USD', 'USD,EUR,GBP'),
      this.currencyApiService.getCurrencies('EUR', 'USD,EUR,GBP'),
      this.currencyApiService.getCurrencies('GBP', 'USD,EUR,GBP'),
    ];

    const currencyCodes: any = {
      USD: 'USD',
      EUR: 'EUR',
      GBP: 'GBP',
    };

    forkJoin(observables)
      .pipe(
        catchError((error) => {
          console.log('Error en al menos uno de los observables:', error);
          return [];
        })
      )
      .subscribe(
        (results) => {
          this.currencies = results.map((result, index) => {
            return {
              ...result.data,
              code: currencyCodes[Object.keys(currencyCodes)[index]],
            };
          });

          //console.log('all currencies', results);
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  convertCurrency() {
    this.currencyApiService
      .convertCurrency(
        this.convertionCurrency.initialBaseCurrency,
        this.convertionCurrency.qtyCurrency,
        this.convertionCurrency.finalBaseCurrency
      )
      .pipe(
        catchError((error) => {
          console.log('Error en al menos uno de los observables:', error);
          return [];
        })
      )
      .subscribe(
        (result) => {
          this.convertionCurrency.resultCurrency = result.result;

          const tasaConversion =
            result['result-float'] / parseFloat(result['from-value']);

          console.log(result);
          const transaction = {
            monedaOrigen: result['from-type'],
            monedaDestino: result['to-type'],
            cantidadOrigen: result['from-value'],
            cantidadDestino: result.result,
            emailCliente: this.emailClient,
            tasaConversion,
          };

          console.log(transaction);

          this.transactionApiService
            .postAddTransaction(transaction)
            .pipe(
              catchError((error) => {
                console.log('Error en el observable: ', error);
                return [];
              })
            )
            .subscribe((result) => {
              try {
                console.log(result);
                alert('Transaccion añadida');
              } catch (err) {
                console.log(err);
              }
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
