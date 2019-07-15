import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product-service.service";
import { switchMap } from "rxjs/operators";
import { Product } from "../../model/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService
      .getAll()
      .valueChanges()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }
}
