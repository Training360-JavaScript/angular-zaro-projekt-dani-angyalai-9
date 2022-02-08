export class Order {
  [key: string]: any;
  id: number = 0;
  customerID: string = "";
  productID: string = "";
  amount: number = 0;
  status: string[] = [ 'new' , 'shipped', 'paid' ];
}
