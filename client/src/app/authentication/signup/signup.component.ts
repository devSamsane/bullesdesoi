import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UIService } from '../../shared/ui/ui.service';
import { AppState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { Signup } from '../../store/actions/auth.actions';

@Component({
  selector: 'bds-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errors: string[] = [];


  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UIService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required] }),
      phone: new FormControl('', { validators: [Validators.required] })
    });
  }

  signup(formData) {
    if (formData.email && formData.password && formData.password === formData.confirmPassword) {
      const payload = formData;
      this.store.dispatch(new Signup(payload));
    }
  }

  reset() {
    this.signupForm.reset();
  }
}
