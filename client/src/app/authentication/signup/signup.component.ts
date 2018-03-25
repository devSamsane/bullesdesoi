import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UIService } from '../../shared/ui/ui.service';

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
    private uiService: UIService
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

  signup(form) {
    if (form.email && form.password && form.password === form.confirmPassword) {
      this.authService.signup(form)
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
            this.uiService.showSnackbar('Utilisateur créé', null, 3000);
          },
          response => this.errors = response.error.errors
        );
    }
  }

  reset() {
    this.signupForm.reset();
  }
}
