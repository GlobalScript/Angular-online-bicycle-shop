import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Observable, map, take, first } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userListRef!: AngularFireList<User>;
  userData!: User;
  userName: string = '';
  userSurname: string = '';
  userRole: string = '';

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.userListRef = db.list('users')
  }

  addUser(user: User): AngularFireList<User> {
    this.userListRef.push(user)
      .then(() => {
        this.router.navigate(['auth/sign-in'])
      })
    return this.userListRef;
  }

  updateUserRole(key: string, role: string): AngularFireList<User> {
    this.userListRef.update(key, { role });
    return this.userListRef;
  }

  getUserByEmail(email: string): Observable<User> {
    return this.db.list('users', ref => ref.orderByChild('email')
      .equalTo(email))
      .stateChanges()
      .pipe(first(), map(user => ({ ...user.payload.toJSON(), key: user.key as string } as User)))
  }

  getUserListByRole(): Observable<User[]> {
    return this.db.list('users', ref => ref.orderByChild('role'))
      .snapshotChanges()
      .pipe(map(list => list.map(user => ({ ...user.payload.toJSON(), key: user.key as string } as User))))
  }

  getAuthUser(email: string): void {
    this.db.list('users', ref => ref.orderByChild('email').equalTo(email))
      .stateChanges().pipe(first(), map(user => ({ ...user.payload.toJSON(), key: user.key as string } as User)))
      .subscribe(user => {
        this.userData = user;
        this.userName = user.name;
        this.userSurname = user.surname;
        this.userRole = user.role;
      })
  }
}
