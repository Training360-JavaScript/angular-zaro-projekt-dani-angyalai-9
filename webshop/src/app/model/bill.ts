export class Bill {
  [key: string]: any;
  id: number = 0;
  orderID: string = "";
  amount: number = 0;
  status: string[] = [ 'new' , 'paid' ];
}
