import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { FormsModule } from '@angular/forms';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => {
      let customerFromList$: Observable<Customer> =
        this.customerService.getItem(params['id']);

      if (params['id'] === '0') {
        this.newCustomer$.subscribe();
        return this.newCustomer$;
      }

      customerFromList$.subscribe()
      return customerFromList$
    })

  )

  newCustomer$: Observable<Customer> = new Observable(subscriber => {
    subscriber.next(new Customer());
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
  }

  private isNewCustomer: boolean = false;

  onUpdate(customerForm: NgForm, customer: Customer): void {
    if (customerForm.invalid) {
      this.messageService.showError()
    }
    else if (customer.id === 0) {
      this.isNewCustomer = true;
      this.customerService.createItem(customer).subscribe(
        () => this.messageService.showSuccess('New customer is added.'),
        (error) => this.messageService.showError(),
        () => this.router.navigate(['/', 'customer'])
      )
    }

    else if (customer.id !== 0 && !this.isNewCustomer) {
      this.isNewCustomer = false;
      this.customerService.updateItem(customer).subscribe(
        () => this.messageService.showSuccess('Update is successfull.'),
        (error) => this.messageService.showError(),
        () => this.router.navigate(['/', 'customer'])
      )
    }
  }
}
