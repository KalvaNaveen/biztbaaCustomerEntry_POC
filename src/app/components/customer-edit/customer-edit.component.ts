import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
   customerForm: FormGroup;
  private customerId :string;
  requestSpinner: boolean=false;
  constructor(
    private service: ApiService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private routeState: ActivatedRoute
  ) {}
 @Input() submitbtnText: string;
  ngOnInit(): void {

this.customerId = this.routeState.snapshot.params['id'];
this.submitbtnText = this.customerId === undefined ? 'Add' : 'Update';

    this.service.dynamicHeaderTextChanger(this.submitbtnText);

    this.customerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone_number: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      status: new FormControl('Active'),
      dateofbirth: new FormControl(null, Validators.required),
    });

    if(this.customerId !== null && this.customerId!== undefined)
    this.service.getCustomer(this.customerId).subscribe(c=>{
      this.customerForm.setValue({
            name: c.name,
            email: c.email,
            phone_number: c.phone_number,
            city: c.city,
            status: c.status,
            dateofbirth: new Date(c.dateofbirth),       
          });
    })


  }

  onSubmit(action) {
    this.requestSpinner = true
    let requestsubmission;
    action === 'Add'
      ? (requestsubmission = this.service.createCustomer(
          this.customerForm.value
        ))
      : (requestsubmission = this.service.updateCustomer(
          this.customerForm.value,this.customerId 
        ));
    requestsubmission.subscribe((c) => {
      this.requestSpinner =false;
      if (c.hasOwnProperty('name')) {
        this._snackBar.open(
          `Customer ${this.customerForm.value['name']} `,
          action === 'Add'?'Created':'Updated',
          {
            duration: 2000,
          }
        );
        this.route.navigate(['']);
      }
    });
  }

  gotoListPage(){
    this.route.navigate(['']);
  }

}
