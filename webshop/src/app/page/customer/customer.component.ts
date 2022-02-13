import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

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
  filterKeys: string[] = ['firstName', 'lastName', 'email', 'zip', 'country', 'city', 'street', 'notes', 'active', 'featured'];

  constructor(
    private customerService: CustomerService,
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onDelete(customer: Customer): void {
    this.customerService.deleteItem(customer.id).subscribe(
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
