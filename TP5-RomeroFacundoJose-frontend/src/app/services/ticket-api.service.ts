import { Injectable, OnInit } from '@angular/core';
import { Ticket } from '../models/ticket';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketApiService implements OnInit {
  private tickets: Array<Ticket>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _http: HttpClient
  ) {
    this.tickets = new Array<Ticket>();
  }

  ngOnInit(): void {}

  //*Select, insert, update, delete

  getTickets(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.get(
      `http://localhost:8080/api/tickets/get-tickets`,
      httpOption
    );
  }

  getTicketsByCategory(category: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      params: {
        category,
      },
    };
    return this._http.get(
      `http://localhost:8080/api/tickets/get-spectator-category/${category}`,
      httpOption
    );
  }

  postAddTicket(ticket: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.post(
      `http://localhost:8080/api/tickets/add-ticket`,
      ticket,
      httpOption
    );
  }

  putEditicket(ticket: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.put(
      `http://localhost:8080/api/tickets/edit-ticket`,
      ticket,
      httpOption
    );
  }

  deleteTicket(ticketId: any): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.delete(
      `http://localhost:8080/api/tickets/delete-ticket/${ticketId}`,
      httpOption
    );
  }

  // public getTicket(ticketId: String): Ticket {
  //   let ticket: Ticket = new Ticket();

  //   let indexTicket: number = this.tickets.findIndex(
  //     (ticket) => ticket._id == ticketId
  //   );
  //   if (indexTicket != -1) ticket = this.tickets[indexTicket];

  //   return ticket;
  // }

  // addTicket(ticket: Ticket) {
  //   ticket._id = String(this.tickets.length + 1);
  //   ticket.chargeDate = new Date();
  //   this.tickets.push(ticket);
  // }

  // updateTicket(updatedTicket: Ticket) {
  //   let ticketFound = this.getTicket(updatedTicket._id);
  //   this.tickets = this.tickets.map((ticket) => {
  //     if (ticketFound == ticket) ticket = updatedTicket;
  //     return ticket;
  //   });
  // }

  // deleteTicket(ticketId: String) {
  //   let ticketIndex = this.tickets.findIndex(
  //     (ticket) => ticket._id == ticketId
  //   );
  //   if (ticketIndex != -1) this.tickets.splice(ticketIndex, 1);
  // }
}
