import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root' 
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; 
  private http = inject(HttpClient); 

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
