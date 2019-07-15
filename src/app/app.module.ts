import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { DataTableModule } from "angular7-data-table";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";

import "hammerjs";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomFormsModule } from "ng2-validation";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth-guard.service";
import { UserService } from "./user.service";
import { AdminAuthGuard } from "./admin-auth-guard.service";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryService } from "./category.service";
import { FormsModule } from "@angular/forms";
import { ProductService } from "./product-service.service";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
    DataTableModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
