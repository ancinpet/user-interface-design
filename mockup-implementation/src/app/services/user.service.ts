import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private allUsers: User[];

  constructor() {
    this.fillUsers();
  }

  private fillUsers(): void {
    this.allUsers = [
      new User(0, 'Jan', 'Novák', 'mail@mail.com', '111 222 333', [8, 9]), // logged-in (current) user
      new User(1, 'Tomas', 'Newman', 'newman@mail.com', '666 666 666'),
      new User(2, 'Petr', 'Novotný', 'novotp@mail.com', '+420998665111'),
      new User(3, 'Jiří', 'Klobása', 'jk@mail.com', '765 767 656'),
      new User(4, 'Pavel', 'Štětina', 'pavel.stetina@mail.com', '123343555'),
      new User(5, 'Milan', 'Krtek', 'milakrtek@mail.com', '+420 888 888 888'),
    ];
  }

  public getAllUsers(): User[] {
    return this.allUsers;
  }

  public getUserById(id: number): User {
    return this.allUsers.find(ad => ad.id === id);
  }

  public getLoggedInUser(): User {
    return this.getUserById(0); // id 0 user
  }

  public addUser(user: User): void {
    this.allUsers.push(user);
  }

  public removeUser(id: number): void {
    this.allUsers = this.allUsers.filter(user => user.id !== id);
  }
}
