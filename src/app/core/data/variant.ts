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

  constructor() {
    this.parent = true;
  }
}
