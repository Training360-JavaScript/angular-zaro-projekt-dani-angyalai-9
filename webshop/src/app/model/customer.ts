import { Address } from './address';
export class Customer {
  //{"id":1,"firstName":"Ilka","lastName":"Perschke","email":"iperschke0@slideshare.net","address":"3136 Pepper Wood Hill","active":true}
  [key: string]: any;
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  address: Address = new Address();
  active: boolean = false;
}
