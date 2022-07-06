import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { HeaderComponent } from './Pages/CommonPages/header/header.component';
import { SidebarComponent } from './Pages/CommonPages/sidebar/sidebar.component';
import { FooterComponent } from './Pages/CommonPages/footer/footer.component';
import { LoaderComponent } from './Pages/CommonPages/loader/loader.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AuthGuard } from 'auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
