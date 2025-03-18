import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root' // Automatically provides this service throughout the app
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Fake API URL
  private http = inject(HttpClient); // Inject HttpClient for API calls

  // Fetch all users (READ)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Add a new user (CREATE)
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user (UPDATE)
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  // Delete a user (DELETE)
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
