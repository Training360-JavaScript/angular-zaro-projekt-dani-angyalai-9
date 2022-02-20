import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers$: Observable<Customer[]> = this.customerService.getAll();

  sorterKey: string = 'id';
  sorterDirection: number = 1;

  phrase: string = '';
  filterKey: string = 'name';
  filterKeys ={
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    zip: 'address.zip',
    country: 'address.country',
    city: 'address.city',
    street: 'address.street',
    notes: 'address.notes',
    active: 'active',
    featured: 'featured'};

  constructor(
    private customerService: CustomerService,
    private ar: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService,
  ) { }

  ngOnInit(): void {
  }
  onDelete(customer: Customer): void {
    this.customerService.deleteItem(customer.id).subscribe(
      () => this.messageService.showDelete(`Customer with ID: ${customer.id} has been deleted`),
      ar => this.router.navigate(['/', 'customer'])
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
