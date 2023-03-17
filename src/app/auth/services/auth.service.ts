import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WrongAuthMessageComponent } from '../components/wrong-auth-message/wrong-auth-message.component';
import { User } from '../interfaces/user';
import { UserProfile } from '../interfaces/user-profile';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth,
    private modalService: NgbModal,
    private router: Router,
    private user: UsersService,
  ) { }

  signUp(userData: User, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(userData.email, password)
      .then(() => {
        this.user.addUser(userData);
      })
      .catch((error) => {
        this.openWarningMessage(error.message);
      });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.user.getAuthUser(res.user?.email as string);
        this.isLoggedIn = true;
        this.router.navigate(['auth/sign-out']);
      })
      .catch(error => {
        this.openWarningMessage(error.message);
      });
  }

  googleAuth() {
    return this.googleSignIn(new GoogleAuthProvider());
  }

  googleSignIn(provider: any): void {
    this.angularFireAuth
      .signInWithPopup(provider)
      .then(res => {
        const profile = res.additionalUserInfo?.profile as UserProfile;
        this.user.getUserByEmail(profile.email).subscribe(data => {
          if (!data) {
            const userData: User = {
              name: profile.given_name,
              surname: profile.family_name,
              role: 'customer',
              email: profile.email,
              key: ''
            }
            this.user.addUser(userData)
              .snapshotChanges().pipe(take(1)).subscribe(() => {
                this.user.getAuthUser(profile.email);
                console.log(profile.email)
                this.isLoggedIn = true;
                this.router.navigate(['auth/sign-out']);
                return;
              })
          }
        })
        this.user.getAuthUser(profile.email);
        this.isLoggedIn = true;
        this.router.navigate(['auth/sign-out']);
      })
      .catch((error) => {
        this.openWarningMessage(error.message);
      });
  }

  signOut(): void {
    this.angularFireAuth.signOut().then(() => {
      this.user.userName = '';
      this.user.userSurname = '';
      this.user.userRole = '';
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      this.router.navigate(['auth/sign-in']);
    });
  }

  getUserSession() {
    this.angularFireAuth.authState
      .pipe(take(1)).subscribe(user => {
        if (user) {
          this.user.getAuthUser(user?.email as string);
          localStorage.setItem('user', 'authorized');
          this.isLoggedIn = true;
        }
      })
  }

  openWarningMessage(error: string): void {
    const modalRef = this.modalService.open(WrongAuthMessageComponent);
    modalRef.componentInstance.message = error;
  }
}
