import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NestedMenuComponent } from './components/nested-menu/nested-menu.component';
import { MaterialModule } from './material.module';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchooldetailsService } from './schooldetails.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StudentModule } from './components/students/student.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MynotificationModule } from './mynotification.module';
import { ToastModule } from 'ng6-toastr/ng2-toastr';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent },
  { path: 'schooldetails', component: SchoolDetailsComponent },
  { path: 'register', component: HomeComponent},
  { path: 'students', loadChildren: './components/students/student.module#StudentModule'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NestedMenuComponent,
    SchoolDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    StudentModule,
    MynotificationModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    SchooldetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
