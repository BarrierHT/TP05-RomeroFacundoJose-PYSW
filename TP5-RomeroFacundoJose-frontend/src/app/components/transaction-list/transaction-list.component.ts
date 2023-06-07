import { Component, OnInit } from '@angular/core';
import { catchError, delay } from 'rxjs';
import { TransactionApiService } from 'src/app/services/transaction-api.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  transactions: any = [];
  currencyOrigen!: string;
  currencyDestino!: string;

  constructor(private transactionApiService: TransactionApiService) {}

  ngOnInit(): void {}

  getTransactions() {
    this.transactionApiService
      .getTransactions()
      .pipe(
        catchError((error) => {
          console.log('Error en el observable: ', error);
          return [];
        }),
        delay(1000) // Agrega un retraso de 1 segundo
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.transactions = result;
        } catch (err) {
          console.log(err);
        }
      });
  }

  getTransactionsByCurrency() {
    this.transactionApiService
      .getTransactionsByCurrency(this.currencyOrigen, this.currencyDestino)
      .pipe(
        catchError((error) => {
          console.log('Error en el observable: ', error);
          return [];
        }),
        delay(1000) // Agrega un retraso de 1 segundo
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.transactions = result;
        } catch (err) {
          console.log(err);
        }
      });
  }
}
