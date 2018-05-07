import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { Signin } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'bds-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  user: User = null;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email]}),
      password: new FormControl('', { validators: [Validators.required] })
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  signin() {
    const payload = {
      email: this.signinForm.value['email'],
      password: this.signinForm.value['password']
    };
    this.store.dispatch(new Signin(payload));
  }


 }
