import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getAll();

  constructor(
    private productService: ProductService,
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onDelete(product: Product): void {
    this.productService.deleteItem(product.id).subscribe(
      ar => this.router.navigate(['/', 'product'])
    );
  }

}
