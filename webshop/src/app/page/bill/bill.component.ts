import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  bills$: Observable<Bill[]> = this.billService.getAll();

  constructor(
    private billService: BillService,
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onDelete(bill: Bill): void {
    this.billService.deleteItem(bill.id).subscribe(
      ar => this.router.navigate(['/', 'bill'])
    );

  }

}
