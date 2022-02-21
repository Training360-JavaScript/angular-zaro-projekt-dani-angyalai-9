import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { MessagesService } from 'src/app/service/messages.service';
import { OrderService } from 'src/app/service/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders$: Observable<Order[]> = this.orderService.getAll();
  displayedColumns: string[] = ['customerID', 'productID', 'amount', 'status', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  sorterKey: string = 'id';
  sorterDirection: number = 1;

  phrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = ['customerID', 'productID', 'amount', 'status'];

  isLoading = true;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private orderService: OrderService,
    private ar: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll()
    .subscribe(
     data => this.isLoading = false,
     error => this.isLoading = false
    );
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  onDelete(order: Order): void {
    this.orderService.deleteItem(order.id).subscribe(
      () => this.messageService.showDelete(`Order with ID: ${order.id} has been deleted`),
      ar => this.router.navigate(['/', 'order']),
      () => this.orders$ = this.orderService.getAll(),
    );
  }

  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }

    this.sorterKey = key;
  }

  onChangePage(pe:PageEvent) {
    this.pageIndex = pe.pageIndex;
    this.pageSize = pe.pageSize;
  }

}
