import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AuthFacadeService } from '../services/auth.facade.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup | undefined;
  loading$: Observable<boolean> | undefined

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacadeService: AuthFacadeService,
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required),
    })
    this.loading$ = this.authFacadeService.loading$
  }

  submitSignUpForm(): void {
    if (this.signUpForm?.valid) {
      const {email, password} = this.signUpForm.value
      this.authFacadeService.signUpWithEmail(email, password)
    }
  }
}
