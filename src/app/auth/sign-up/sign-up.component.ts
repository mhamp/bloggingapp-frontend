import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpRequestPayload } from './sign-up-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpRequestPayload: SignUpRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService) {
    this.signUpRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signUpRequestPayload.username = this.signupForm.get('username').value;
    this.signUpRequestPayload.email = this.signupForm.get('email').value;
    this.signUpRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signUpRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'], 
        { queryParams: { registered: 'true' } });
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}