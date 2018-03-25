import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'bds-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.scss']
})
export class HomeContactComponent implements OnInit {

  contactForm: FormGroup;

  ngOnInit() {
    this.contactForm = new FormGroup({
      lastname: new FormControl(null, { validators: [Validators.required] }),
      firstname: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null),
      comment: new FormControl(null, { validators: [Validators.required] })
    });
  }

  submitFormData(form: FormData) {

  }
}
