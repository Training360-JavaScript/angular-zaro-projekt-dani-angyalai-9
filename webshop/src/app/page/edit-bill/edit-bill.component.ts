import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {
  bill$: Observable<Bill> = this.ar.params.pipe(switchMap(params => this.billService.get(params['id'])),
  );

  constructor(
    private ar: ActivatedRoute,
    private billService: BillService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(bill: Bill): void {
    this.billService.updateItem(bill).subscribe(
      bill => this.router.navigate(['/', 'bill']),
      );
  }

}
