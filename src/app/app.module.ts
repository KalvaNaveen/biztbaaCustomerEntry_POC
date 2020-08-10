import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import {HeaderComponent } from './components/header/header.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { Routes,RouterModule } from '@angular/router';


const Routing:Routes=[
  {path:'',component:CustomerListComponent},
  {path:'customer/details/:id',component:CustomerDetailComponent},
  {path:'customer/edit/:id',component:CustomerEditComponent},
  {path:'customer/add',component:CustomerEditComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,MatInputModule,MatButtonModule,
    BrowserAnimationsModule,MatTooltipModule,MatProgressSpinnerModule,MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,MatCardModule,
    RouterModule.forRoot(Routing)
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
