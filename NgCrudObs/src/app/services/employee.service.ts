import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

const baseUrl = 'http://localhost:8082/api/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${baseUrl}/${id}`);
  }

  getEmployeeByEmail(email: string): Observable<Employee> {
    return this.http.get<Employee>(`${baseUrl}/email/${email}`);
  }

  updatePassword(emp: Employee): Observable<any> {
    return this.http.put(`${baseUrl}/password/${emp.passcode}/${emp.employeeId}`, emp,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

  updatePhone(emp: Employee): Observable<any> {
    return this.http.put(`${baseUrl}/phone/${emp.phone}/${emp.employeeId}`, emp,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

}
