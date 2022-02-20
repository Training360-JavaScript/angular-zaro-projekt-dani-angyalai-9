import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { MessagesService } from 'src/app/service/messages.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getAll();

  sorterKey: string = 'id';
  sorterDirection: number = 1;

  phrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = ['name', 'type', 'catID', 'description', 'price', 'featured', 'active'];

  isLoading = true;

  constructor(
    private productService: ProductService,
    private ar: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.productService.getAll()
       .subscribe(
        data => this.isLoading = false,
        error => this.isLoading = false
    );
  }

  onDelete(product: Product): void {
    this.productService.deleteItem(product.id).subscribe(
      () => this.messageService.showDelete(`Product with ID: ${product.id} has been deleted`),
      ar => this.router.navigate(['/', 'product']),
      () => this.products$ = this.productService.getAll(),
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
