import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../product-service.service";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Product } from "../../../model/product";
import { DataTableResource } from "angular7-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(products => {
        this.products = products;
        this.initializaTable(products);
      });
  }

  private initializaTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => (this.items = items));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    let filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializaTable(filteredProducts);
  }
}
