
export class Procedure {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  date?: Date;

  constructor() {
    this.name = '',
    this.description = '';
    this.price = null;
    this.date = null;
  }
}
