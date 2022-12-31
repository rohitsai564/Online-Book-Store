import { Orders } from './../models/orders.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8082/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  listAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(baseUrl);
  }

  listOrdersByOrderDate(date: string, id: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${baseUrl}/order/${date}/${id}`);
  }

  listOrdersByDeliveryDate(date: Date): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${baseUrl}/delivery/${date}`);
  }

  listAllPendingOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${baseUrl}/pending`);
  }

  listAllCustomerPendingOrders(id: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${baseUrl}/cpending/${id}`);
  }

  showOrderDetails(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${baseUrl}/${id}`);
  }

  listAllCustomerOrders(id: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${baseUrl}/history/${id}`);
  }

  uploadNewOrderDetails(order: Orders): Observable<Orders>{
    return this.http.post<Orders>(baseUrl, order);
  }

  updateOrderStatus(order: Orders): Observable<any> {
    return this.http.put(`${baseUrl}/status/${order.orderStatus}/${order.orderId}`, order,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

  showAllCustomerOrdersByStatus(status: number, id: number): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${baseUrl}/all/${status}/${id}`);
  }

  showAllOrdersByStatus(status: number): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${baseUrl}/admin/${status}`);
  }
}
