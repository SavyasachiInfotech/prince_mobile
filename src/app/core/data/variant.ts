export class Variant {
  product_id: number;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  min_qty: number;
  parent: boolean;
  image_required: boolean;
  tax_id: number;
  accept_promocode: boolean;
  warranty: number;

  constructor() {
    this.parent = true;
    this.min_qty = 0;
    this.quantity = 0;
    this.tax_id = 4;
    this.warranty = 0;
  }
}
