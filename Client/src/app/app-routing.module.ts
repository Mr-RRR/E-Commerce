import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutModule } from './layout/layout.module';
import { RegisterComponent } from './layout/register/register.component';
import { LoginComponent } from './layout/login/login.component';
import { CartComponent } from './layout/cart/cart.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './layout/admin/admin.component';
import { AddProductsComponent } from './layout/add-products/add-products.component';
import { ViewProductsComponent } from './layout/view-products/view-products.component';
import { ProductViewComponent } from './layout/product-view/product-view.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/cart', component: CartComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'dashboard/:id', component: ProductViewComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
