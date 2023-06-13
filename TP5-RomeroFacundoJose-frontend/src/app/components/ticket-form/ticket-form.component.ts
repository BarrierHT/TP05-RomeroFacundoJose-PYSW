import { Component, OnDestroy, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { SpectatorApiService } from 'src/app/services/spectator-api.service';
import { TicketApiService } from 'src/app/services/ticket-api.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-punto5',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
})
export class TicketFormComponent implements OnInit, OnDestroy {
  ticket!: Ticket;
  // ticketCopy!: Ticket;
  chargedPrice!: number;
  action!: String;
  updateConfirmed!: Boolean;
  spectators: any;

  constructor(
    private ticketApiService: TicketApiService,
    private spectatorApiService: SpectatorApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.ticket = new Ticket();
    // this.ticketCopy = new Ticket();
    this.updateConfirmed = false;
    this.action = 'insert';
  }

  ngOnInit(): void {
    this.getSpectators();

    this.activatedRoute.params.subscribe((params) => {
      console.log(params['ticketId']);
      //console.log(this.ticketService.getTickets());
      if (params['ticketId'] == 'insert') {
        this.updateConfirmed = false;
        this.action = 'insert';
      } else {
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

              this.ticket = result.find(
                (ticket: Ticket) => ticket._id.toString() == params['ticketId']
              );

              this.ticket.espectador = this.ticket.espectador._id;

              console.log(this.ticket);

              if (this.ticket) {
                this.updateConfirmed = true;
                this.action = 'update';
                // this.ticketCopy = Object.assign({}, this.ticket);
              }
            } catch (err) {
              console.log(err);
            }
          });

        // .find((ticket) => ticket._id.toString() == params['ticketId']);

        // if (updateAllowed) {

        // } else this.router.navigate(['home']);
      }
    });
    //console.log(this.action);
  }

  ngOnDestroy(): void {
    //console.log('real2: ', this.ticket);
    //console.log('copy2: ', this.ticketCopy);
    //console.log(this.action, ' ', this.updateConfirmed);
    // if (this.updateConfirmed == false) {
    //   this.ticketService.updateTicket(this.ticketCopy);
    // }
  }

  getSpectators() {
    this.spectatorApiService
      .getSpectators()
      .pipe(
        catchError((error) => {
          console.log('Error en el observable: ', error);
          return [];
        }),
        delay(500) // Agrega un retraso de .5 segundos
      )
      .subscribe((result) => {
        try {
          console.log(result);
          this.spectators = result;
        } catch (err) {
          console.log(err);
        }
      });
  }

  public saveTicket() {
    //! Needs more validation
    if (this.action == 'insert') {
      this.updateConfirmed = false;

      this.ticket.fechaCompra = format(new Date(), 'yyyy-MM-dd');
      console.log(this.ticket);

      this.ticketApiService
        .postAddTicket(this.ticket)
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
              this.router.navigate(['tickets']);
            }
          } catch (err) {
            console.log(err);
          }
        });
    } else if (this.action == 'update') {
      if (this.updateConfirmed) {
        this.ticketApiService
          .putEditicket(this.ticket)
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
                this.router.navigate(['tickets']);
              } else {
                //Si ocurrio alguna validacion en el back
                alert('Ocurrio un error');
              }
            } catch (err) {
              console.log(err);
            }
          });
      }
    }
  }

  public getDiscount() {
    //* Could be imported in ticket.service
    this.chargedPrice = this.ticket.precioTicket;
    if (this.ticket.categoriaEspectador == 'l') this.chargedPrice *= 0.8;
    return this.chargedPrice;
  }
}
