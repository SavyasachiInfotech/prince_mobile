export class InsertProduct {
  id: number;
  category_id: number;
  subcategory_id: number;
  description: string;
  is_display: boolean;
  total_weight: number;
  dimention_breadth: number;
  dimention_height: number;
  dimention_length: number;
  hsncode: number;

  constructor() {
    this.is_display = true;
    this.total_weight = 0.0;
    this.dimention_breadth = 0.0;
    this.dimention_height = 0.0;
    this.dimention_length = 0.0;
    this.hsncode = 0;
  }
}
