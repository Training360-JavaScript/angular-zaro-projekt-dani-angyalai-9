import { Injectable } from '@angular/core';

export interface IMenuItem{
  url: string;
  text: string;
  disabled?: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  menuItems: IMenuItem[] = [
    {url: '/', text: 'Dashboard', icon: 'dashboard'},
    {url: '/product', text: 'Products', icon: 'shopping_basket'},
    {url: '/customer', text: 'Customers', icon: 'supervisor_account'},
    {url: '/order', text: 'Orders', icon: 'view_list'},
    {url: '/bill', text: 'Bills', icon: 'description'}
  ];

  constructor() { }
}
