import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CustomerListComponent } from '../components/customer-list/customer-list.component';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

storiesOf('Customer List', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        MatTableModule,        
        HttpClientModule,
        MatButtonModule,
        MatIconModule,        
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
      declarations: [CustomerListComponent],
      providers: [ApiService],
    })
  )
  .add('defaultList', () => {
    return {
      template: `<app-customer-list></app-customer-list>`,
    };
  })
  .add('Loader', () => {
    return {
      template: `<mat-spinner></mat-spinner>`,
      props: {
        hearderText: 'List',
      },
    };
  });
