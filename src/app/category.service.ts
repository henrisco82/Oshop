import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { DatabaseReference } from "@angular/fire/database/interfaces";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db.list("/categories", (ref: DatabaseReference) =>
      ref.orderByChild("name")
    );
  }
}
