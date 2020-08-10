import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  name: string;
  dateofbirth: Date;
  status: string;
  email: string;
  phonenumber: number;
  city: string;
  activateSpinner:boolean= false;
  constructor(private service: ApiService, private Router: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateSpinner = true;
    this.service.dynamicHeaderTextChanger('Details');
    let custId = this.Router.snapshot.params['id'];
    this.service.getCustomer(custId).subscribe((c) => {
      this.city = c.city;
      this.dateofbirth = c.dateofbirth;
      this.status = c.status;
      this.email = c.email;
      this.name = c.name;
      this.phonenumber = c.phone_number;
      this.activateSpinner = false;
    });
  }
}
