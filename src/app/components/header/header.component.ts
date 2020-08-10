import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private service:ApiService,private router:Router) { }
private dynamicHearderText = new Subscription;

hearderText:string = 'List';

  ngOnInit(): void {
    this.dynamicHearderText = this.service.appHeadertext.subscribe(text=>this.hearderText=text)
  }
  addCustomerForm(actiontext) {
    this.hearderText=actiontext;
  this.router.navigate(['/customer/add'],actiontext)
  }

  applyFilter(filterValue: string) {
    this.service.searchFilter(filterValue);
  }
ngOnDestroy(){
  this.dynamicHearderText.unsubscribe();
}

}
