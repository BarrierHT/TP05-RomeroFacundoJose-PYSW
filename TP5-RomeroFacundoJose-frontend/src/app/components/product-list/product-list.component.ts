import { Component, OnInit } from '@angular/core';
import { Observable, catchError, delay, forkJoin } from 'rxjs';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-pagea',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any = [];

  constructor(private productApiService: ProductApiService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    //console.log(this.pattern);

    this.productApiService
      .getFeaturedProducts()
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
          this.products = result;
        } catch (err) {
          console.log(err);
        }
      });
  }
}
