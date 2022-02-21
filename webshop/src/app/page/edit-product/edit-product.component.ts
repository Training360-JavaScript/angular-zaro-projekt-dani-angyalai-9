import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { MessagesService } from 'src/app/service/messages.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => {
      let productFromList$: Observable<Product> =
        this.productService.getItem(params['id']);

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
    private router: Router,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
  }

  private isNewProduct: boolean = false;

  onUpdate(productForm: NgForm, product: Product): void {
    if (productForm.invalid) {
      this.messageService.showError()
    }

    else if (product.id === 0) {
      this.isNewProduct = true;
      this.productService.createItem(product).subscribe(
        () => this.messageService.showSuccess('New product is added.'),
        (error) => this.messageService.showError(),
        () => this.router.navigate(['/', 'product'])
      )
    }

    else if (product.id !== 0 && !this.isNewProduct) {
      this.isNewProduct = false;
      this.productService.updateItem(product).subscribe(
        () => this.messageService.showSuccess('Update is successfull.'),
        (error) => this.messageService.showError(),
        () => this.router.navigate(['/', 'product'])
      )
    }
  }

}