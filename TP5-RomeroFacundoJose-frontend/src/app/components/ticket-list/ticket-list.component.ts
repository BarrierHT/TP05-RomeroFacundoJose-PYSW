import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketApiService } from 'src/app/services/ticket-api.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent implements OnInit {
  tickets: Array<Ticket>;
  category: string = '';

  sells: any;
  quantities: any;

  constructor(
    private ticketApiService: TicketApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.tickets = new Array<Ticket>();

    this.sells = {
      sumLocal: 0,
      sumForeign: 0,
    };
    this.quantities = {
      local: 0,
      foreign: 0,
    };
  }

  ngOnInit(): void {
    // this.getSells();
    // this.getQuantities();
  }

  getTickets() {
    this.ticketApiService
      .getTickets()
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
          this.tickets = result;
          this.getQuantities();
          this.getSells();
          this.cdr.detectChanges(); // forzar una actualización inmediata de la vista
        } catch (err) {
          console.log(err);
        }
      });
  }

  getTicketsByCategory() {
    this.ticketApiService
      .getTicketsByCategory(this.category)
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
          this.tickets = result;
          this.getQuantities();
          this.getSells();
          this.cdr.detectChanges(); // forzar una actualización inmediata de la vista
        } catch (err) {
          console.log(err);
        }
      });
  }

  updateTicket(ticketId: String) {
    this.router.navigate(['add-ticket', ticketId]);
  }

  deleteTicket(ticketId: String) {
    this.ticketApiService
      .deleteTicket(ticketId)
      .pipe(
        catchError((error) => {
          console.log('Error en el observable: ', error);
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
          if (result.status == '1') {
            const index = this.tickets.findIndex(
              (ticket) => ticket._id === ticketId
            );
            if (index > -1) {
              this.tickets.splice(index, 1);
              this.getQuantities();
              this.getSells();
              this.cdr.detectChanges();
            }
          } else {
            //!Si ocurrio alguna falla de validacion en el back
            alert('Ocurrio un error');
          }
        } catch (err) {
          console.log(err);
        }
      });
  }

  getSells() {
    let sumLocal = 0,
      sumForeign = 0;

    this.tickets.forEach((ticket) => {
      if (ticket.categoriaEspectador == 'l') sumLocal += ticket.precioTicket;
      else if (ticket.categoriaEspectador == 'e')
        sumForeign += ticket.precioTicket;
    });

    this.sells.sumLocal = sumLocal;
    this.sells.sumForeign = sumForeign;
  }

  getQuantities() {
    this.quantities.local = this.tickets.filter(
      (ticket) => ticket.categoriaEspectador == 'l'
    ).length;
    this.quantities.foreign = this.tickets.length - this.quantities.local;
  }
}
