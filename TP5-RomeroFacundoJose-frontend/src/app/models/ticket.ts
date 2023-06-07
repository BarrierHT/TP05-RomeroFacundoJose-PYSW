export class Ticket {
  _id!: String;
  categoriaEspectador!: String;
  precioTicket: number;
  fechaCompra: String;
  espectador: any;

  //*define data types with String (Object)
  constructor(
    _id?: String,
    categoriaEspectador?: String,
    precioTicket?: number,
    fechaCompra?: String,
    espectador?: any
  ) {
    this._id = _id ?? '';
    this.categoriaEspectador = categoriaEspectador ?? '';
    this.precioTicket = precioTicket ?? 0;
    this.fechaCompra = fechaCompra ?? '';
    this.espectador = espectador ?? '';
  }
}
