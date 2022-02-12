import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';

import { BillComponent } from './page/bill/bill.component';
import { CustomerComponent } from './page/customer/customer.component';
import { HomeComponent } from './page/home/home.component';
import { OrderComponent } from './page/order/order.component';
import { ProductComponent } from './page/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product/:id',
    component: EditProductComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'customer/:id',
    component: EditCustomerComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order/:id',
    component: OrderComponent,
  },
  {
    path: 'bill',
    component: BillComponent,
  },
  {
    path: 'bill/:id',
    component: BillComponent,
  },
  {
    path: '**',
    redirectTo:'',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
