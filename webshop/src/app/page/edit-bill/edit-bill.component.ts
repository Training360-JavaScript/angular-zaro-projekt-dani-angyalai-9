import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  bill$: Observable<Bill> = this.activatedRoute.params.pipe(
    switchMap( params => {
      let billFromList$: Observable<Bill> =
      this.billservice.getItem(params['id']);

      if (params['id'] === '0') {
      this.newBill$.subscribe();
      return this.newBill$;
      }

      billFromList$.subscribe()
      return billFromList$
    })
  )

  newBill$: Observable<Bill> = new Observable(subscriber => {
    subscriber.next(new Bill());
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private billservice: BillService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private isNewBill: boolean = false;

  onUpdate(billForm: NgForm, bill: Bill): void {
    if (bill.id === 0) {
      this.isNewBill = true;
      this.billservice.createItem(bill).subscribe(
        () => this.router.navigate(['/', 'bill'])
      )
    }

    if (bill.id !== 0 && !this.isNewBill) {
      this.billservice.updateItem(bill).subscribe(
        () => this.router.navigate(['/', 'bill'])
      )
    }
  }

}
