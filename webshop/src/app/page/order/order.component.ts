import { Component, OnInit } from '@angular/core';
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

  sorterKey: string = 'id';
  sorterDirection: number = 1;

  phrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = ['customerID', 'productID', 'amount', 'status'];

  constructor(
    private orderService: OrderService,
    private ar: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService,
  ) { }

  ngOnInit(): void {
  }

  onDelete(order: Order): void {
    this.orderService.deleteItem(order.id).subscribe(
      () => this.messageService.showDelete(`Order with ID: ${order.id} has been deleted`),
      ar => this.router.navigate(['/', 'order'])
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

}
