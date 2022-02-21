import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  bills$: Observable<Bill[]> = this.billService.getAll();

  phrase: string = '';
  filterKey: string = '';
  filterKeys: string[] = ['orderID', 'amount', 'status'];

  sorterKey: string = 'id';
  sorterDirection: number = 1;

  isLoading = true;

  pageIndex: number = 0;
  pageSize: number = 10;


  constructor(
    private billService: BillService,
    private ar: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService,
  ) { }


  ngOnInit() {
    this.billService.getAll()
       .subscribe(
        data => this.isLoading = false,
        error => this.isLoading = false
    );
  }

  onDelete(bill: Bill): void {
    this.billService.deleteItem(bill.id).subscribe(
      () => this.messageService.showDelete(`Bill with ID: ${bill.id} has been deleted.`),
      ar => this.router.navigate(['/', 'bill']),
      () => this.bills$ = this.billService.getAll(),
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
