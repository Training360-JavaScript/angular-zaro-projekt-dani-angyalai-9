import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => {
      let productFromList$: Observable<Product> = 
      this.productService.get(params['id']);

      if (params['id'] === '0') {
        this.newProduct$.subscribe();
        return this.newProduct$;
      }

      productFromList$.subscribe()
      return productFromList$
    })
  );

  newProduct$: Observable<Product> = new Observable(subscriber => {
    subscriber.next(new Product());
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private isNewProduct: boolean = false;

  onUpdate(productForm: NgForm, product: Product): void {
    if (product.id === 0) {
      this.isNewProduct = true;
      this.productService.create(product).subscribe(
        () => this.router.navigate(['/']) //ide majd a product page linkje kell!!!
        )
      }
      
      if (product.id !== 0 && !this.isNewProduct) {
        this.isNewProduct = false;
        this.productService.update(product).subscribe(
          () => this.router.navigate(['/']) //ide majd a product page linkje kell!!!          
      )
    }

  }

}

