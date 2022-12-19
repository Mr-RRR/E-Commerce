import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from './layout/layout.module';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, NgbModule],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
   }, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
