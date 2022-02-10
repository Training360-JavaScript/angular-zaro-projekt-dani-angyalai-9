import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditCategoryComponent } from './page/edit-category/edit-category.component';
import { EditAddressComponent } from './page/edit-address/edit-address.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    EditProductComponent,
    EditCustomerComponent,
    EditBillComponent,
    EditCategoryComponent,
    EditAddressComponent,
    EditOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
