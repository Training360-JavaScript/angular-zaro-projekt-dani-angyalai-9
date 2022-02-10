import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  category$: Observable<Category> = this.ar.params.pipe(switchMap(params => this.categoryService.get(params['id'])),
  );

  constructor(
    private ar: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(category: Category): void {
    this.categoryService.updateItem(category).subscribe(
      category => this.router.navigate(['/', 'bill']),
      );
  }
}
