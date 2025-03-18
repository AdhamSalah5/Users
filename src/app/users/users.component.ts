import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];
  newUser: User = { name: '', email: '' };
  selectedUser: User = { id: 0, name: '', email: '' };

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUser(): void {
    if (!this.newUser.name || !this.newUser.email) return;
    this.userService.addUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.newUser = { name: '', email: '' };
    });
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    if (!this.selectedUser.id) return;
    this.userService.updateUser(this.selectedUser).subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.selectedUser = { id: 0, name: '', email: '' };
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
