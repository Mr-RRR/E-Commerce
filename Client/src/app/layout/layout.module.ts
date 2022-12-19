import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    AdminComponent,
    AddProductsComponent,
    ViewProductsComponent,
    EditProductComponent,
    ProductViewComponent,
  ],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class LayoutModule {}
