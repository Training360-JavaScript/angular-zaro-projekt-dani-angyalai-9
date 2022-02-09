export class Product {
  //{"id":1,"name":"Sprouts - Corn","type":"Masonry","catID":4,"description":"Dilation of Ascending Colon, Percutaneous Approach","price":72,"featured":false,"active":true}
  [key: string]: any;
  id: number = 0;
  name: string = "";
  type: string = "";
  catID: number = 0;
  description: string = "";
  price: number = 0;
  featured: boolean = false;
  active: boolean = false;
}
