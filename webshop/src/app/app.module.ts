import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { ProductComponent } from './page/product/product.component';
import { CustomerComponent } from './page/customer/customer.component';
import { OrderComponent } from './page/order/order.component';
import { BillComponent } from './page/bill/bill.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SumPipe } from './pipe/sum.pipe';
import { ChartSpinnerComponent } from './common/chart-spinner/chart-spinner.component';
import { ChartPieComponent } from './common/chart-pie/chart-pie.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    EditProductComponent,
    EditCustomerComponent,
    EditBillComponent,
    EditOrderComponent,
    FilterPipe,
    SorterPipe,
    ProductComponent,
    CustomerComponent,
    OrderComponent,
    BillComponent,
    SumPipe,
    ChartSpinnerComponent,
    ChartPieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,

    NgChartsModule,
    NgCircleProgressModule.forRoot({
      // defaults
      radius: 100,
      units: '',
      unitsFontSize: '20',
      unitsFontWeight: '2em',
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animation: true,
      animationDuration: 700,
      subtitleFontSize: '13',
      subtitleFontWeight: '2em',
      subtitleColor: 'black',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
