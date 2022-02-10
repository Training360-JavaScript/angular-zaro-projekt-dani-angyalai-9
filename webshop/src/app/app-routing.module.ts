import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './page/bill/bill.component';
import { CustomerComponent } from './page/customer/customer.component';
import { EditAddressComponent } from './page/edit-address/edit-address.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditCategoryComponent } from './page/edit-category/edit-category.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
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
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'bill',
    component: BillComponent,
  },
  {
    path: 'edit-address',
    component: EditAddressComponent,
  },
  {
    path: 'edit-bill',
    component: EditBillComponent,
  },
  {
    path: 'edit-category',
    component:   EditCategoryComponent,
  },
  {
    path: 'edit-customer',
    component: EditCustomerComponent,
  },
  {
    path: 'edit-order',
    component: EditOrderComponent,
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
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
