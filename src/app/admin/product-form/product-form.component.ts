import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../category.service";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { ProductService } from "../../product-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../../../model/product";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  id: string;
  previewPhoto: boolean = false;
  product: Product = {
    title: null,
    price: 0,
    category: null,
    imageUrl: null
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  save(prod: NgForm): void {
    if (this.id) {
      this.productService.update(this.id, prod.value);
    } else this.productService.save(prod.value);
    this.router.navigate(["admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product?")) return;
    this.productService.delete(this.id);
    this.router.navigate(["admin/products"]);
  }
}
