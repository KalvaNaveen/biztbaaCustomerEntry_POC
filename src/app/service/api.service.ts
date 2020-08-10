import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchInput = new Subject<string>();
  //customerDetails = new Subject<customer>();
  appHeadertext = new Subject<string>();

  dynamicHeaderTextChanger(text) {
    this.appHeadertext.next(text);
  }

  searchFilter(userInput) {
    this.searchInput.next(userInput);
  }

  fetchCustomers() {
    let apiURLPath = `https://biztbaapoc.firebaseio.com/customers.json`;
    return this.http.get(apiURLPath).pipe(
      map((responsedata) => {
        let modifiedCustomerlist: customer[] = [];
        for (let key in responsedata) {
          if (responsedata.hasOwnProperty(key))
            modifiedCustomerlist.push({ ...responsedata[key], id: key });
        }
        return modifiedCustomerlist;
      })
    );
  }

  createCustomer(customerbody) {
    customerbody.dateofbirth = customerbody.dateofbirth.toLocaleDateString();
    let apiURLPath = `https://biztbaapoc.firebaseio.com/customers.json`;
    return this.http.post(apiURLPath, customerbody);
  }

  getCustomer(customerId: string) {
    let apiURLPath = `https://biztbaapoc.firebaseio.com/customers/${customerId}.json`;
   return this.http.get<customer>(apiURLPath);
  }

  updateCustomer(customerbody,customerid:string) {
    customerbody.dateofbirth = customerbody.dateofbirth.toLocaleDateString();
    let apiURLPath = `https://biztbaapoc.firebaseio.com/customers/${customerid}.json`;
    return this.http.put(apiURLPath, customerbody);
  }

  deleteCustomer(customerId: string) {
    let apiURLPath = `https://biztbaapoc.firebaseio.com/customers/${customerId}.json`;
    return this.http.delete(apiURLPath);
  }
}
