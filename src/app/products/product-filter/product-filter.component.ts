import { Component, OnInit, Input } from "@angular/core";
import { CategoryService } from "../../category.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"]
})
export class ProductFilterComponent implements OnInit {
  @Input("category") category: string;
  categories$: Observable<any[]>;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
}
