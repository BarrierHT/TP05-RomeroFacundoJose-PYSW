import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from 'src/app/services/product-api.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  product: any = {};
  productFormData: any = {
    destacado: true,
  };

  constructor(
    private productApiService: ProductApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public saveProduct(formData: any) {
    console.log(formData);

    const { nombre, descripcion, imagen, precio, stock, destacado } = formData;

    this.product = {
      nombre,
      descripcion,
      imagen,
      precio,
      stock,
      destacado,
    };

    console.log(this.product);

    this.productApiService
      .postAddProduct(this.product)
      .pipe(
        catchError((error) => {
          console.log('Error en el observable: ', error);
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);

          this.router.navigate(['products']);
        } catch (err) {
          console.log(err);
        }
      });
  }
}
