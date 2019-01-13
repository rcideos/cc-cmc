import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiServiceService } from './service/api-service.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CardComponent } from './components/card/card.component'


const appRoutes: Routes = [
  { path: 'home', component: SignInComponent },
  { path: 'card', component: CardComponent },
  { path: '',redirectTo: '/home',pathMatch: 'full'},
  { path: '**',redirectTo: '/home'}
];


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CardComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
