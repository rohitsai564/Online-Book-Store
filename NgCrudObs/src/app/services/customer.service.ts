import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8082/api/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  listAllCustomers() :Observable<Customer[]> {
    return this.http.get<Customer[]>(baseUrl);
  }

  getCustomerDetailsById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${baseUrl}/${id}`);
  }

  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`${baseUrl}/email/${email}`);
  }

  uploadCustomerDetails(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`/add/customers`, customer);
  }

  

  updateWallet(customer: Customer): Observable<any> {
    return this.http.put(`${baseUrl}/wallet/${customer.wallet}/${customer.customerid}`, customer,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

  updatePhone(customer: Customer): Observable<any> {
    return this.http.put(`${baseUrl}/phone/${customer.phone}/${customer.customerid}`, customer,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

 

  updateAddress(customer: Customer): Observable<any> {
    return this.http.put(`${baseUrl}/address/${customer.address}/${customer.customerid}`, customer,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }
}
