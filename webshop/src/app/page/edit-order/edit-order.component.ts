import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap( params => {
      let orderFromList$: Observable<Order> = 
      this.orderService.getItem(params['id']);

      if (params['id'] === '0') {
        this.newOrder$.subscribe();
        return this.newOrder$;
      }

      orderFromList$.subscribe()
      return orderFromList$
    })
  );

  newOrder$: Observable<Order> = new Observable(subscriber => {
    subscriber.next(new Order());
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private isNewOrder: boolean = false;

  onUpdate(orderForm: NgForm, order: Order): void {
    if (order.id === 0) {
      this.isNewOrder = true;
      this.orderService.createItem(order).subscribe(
        () => this.router.navigate(['/', 'order'])
        )
      }
      
      if (order.id !== 0 && !this.isNewOrder) {
        this.isNewOrder = false;
        this.orderService.updateItem(order).subscribe(
          () => this.router.navigate(['/', 'order'])          
      )
    }

  }

}
