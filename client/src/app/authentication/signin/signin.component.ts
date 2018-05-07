import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { Signin } from '../../store/actions/auth.actions';

@Component({
  selector: 'bds-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  user: User = null;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email]}),
      password: new FormControl('', { validators: [Validators.required] })
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
