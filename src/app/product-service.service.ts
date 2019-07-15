import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/database";
import { Product } from "../model/product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  save(product) {
    return this.db.list("/products").push(product);
  }

  getAll(): AngularFireList<Product> {
    return this.db.list("/products");
  }

  get(productId): AngularFireObject<Product> {
    return this.db.object<Product>("/products/" + productId);
  }

  update(productId, product) {
    return this.db.object<Product>("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object<Product>("/products/" + productId).remove();
  }
}
