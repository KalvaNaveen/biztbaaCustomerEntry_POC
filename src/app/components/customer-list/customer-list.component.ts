import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { customer } from 'src/app/model/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'phone_number',
    'email',
    'city',
    'dateofbirth',
    'status',
    'actions',
  ];
 @Input() dataSource: MatTableDataSource<customer>;
  activateSpinner: boolean = false;
  deleteSpinner: boolean = false;
  private searchInput: Subscription;

  constructor(
    private service: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
this.service.dynamicHeaderTextChanger('List');
    this.activateSpinner = true;
    try {
      this.service.fetchCustomers().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.activateSpinner = false;
      });
    } catch (error) {
      this.activateSpinner = false;
      console.log(error);
    }
    this.searchInput = this.service.searchInput.subscribe(
      (searchinput) => (this.dataSource.filter = searchinput)
    );
  }

  viewCustomer(custId) {
    this.router.navigate(['/customer/details',custId]);
  }
  editCustomer(custId) {
    this.router.navigate(['/customer/edit',custId]);
  }
  deleteCustomer(custId, customerName) {
    this.service.deleteCustomer(custId).subscribe((d) => {
      if (d === null) {
        this._snackBar.open(`Customer ${customerName}`, 'Deleted', {
          duration: 2000,
        });
        this.dataSource.filteredData.splice(
          this.dataSource.filteredData.findIndex((i) => i.id === custId),
          1
        );
        this.dataSource.filter = '';
      }
    });
  }

  ngOnDestroy() {
    this.searchInput.unsubscribe();
  }
}
