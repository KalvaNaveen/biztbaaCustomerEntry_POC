import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { HeaderComponent } from '../components/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatButton } from '@angular/material/button';

storiesOf('Header', module)
  .addDecorator(
    moduleMetadata({
      imports: [ HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,MatButtonModule,MatIconModule,MatInputModule
      ],
      declarations: [HeaderComponent],
      providers: [ApiService],
    })
  )
  
  .add('search button', () => ( {
      template: `<div><mat-form-field *ngIf="hearderText === 'List'" class="toolbar__search" >
        <mat-label>search</mat-label>
          <input matInput placeholder="search" autocomplete="off" (keyup)=applyFilter($event.target.value) >
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field></div>`,
      props: {
        hearderText: 'List',
        applyFilter:action('Log every key Stroke of User search input')
      },
     
    })
  )
  .add('add button', ()=>(
     {
      template: `<button *ngIf="hearderText==='List'" 
       mat-raised-button color="accent" 
        (click)="addCustomerForm('Add')"><mat-icon>add</mat-icon></button>`,
      props: {
        hearderText: 'List',
        addCustomerForm:action('Redirect to Add Customer Form! With Action Param ')
      },
      
    })
  );
