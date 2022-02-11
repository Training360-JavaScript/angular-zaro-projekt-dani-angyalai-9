import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';

import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product/:id',
    component: EditProductComponent,
  },
  {
    path: 'customer/:id',
    component: EditCustomerComponent,
  },
  {
    path: 'order/:id',
    component: EditOrderComponent,
  },
  {
    path: 'bill/:id',
    component: EditBillComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
