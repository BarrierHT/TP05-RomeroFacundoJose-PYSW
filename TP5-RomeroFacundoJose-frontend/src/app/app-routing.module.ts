import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'currency', component: TransactionsComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'tickets', component: TicketListComponent },
  { path: 'add-ticket/:ticketId', component: TicketFormComponent },

  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
