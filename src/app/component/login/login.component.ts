import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;

 

  constructor(private formBuilder : FormBuilder, private authService : AuthenticationService, private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    // const storedData = localStorage.getItem('user_key');
    // console.log('storedData', storedData);
    // if(storedData){
    //   const storeduserData = JSON.parse(storedData);
    //   console.log(storeduserData.email);
      
    // }
    // else{
    //   console.log('not updated stored data');
    // }
    const userEmail = this.loginForm.value.email;
    const userPassword = this.loginForm.value.password;

    if (this.authService.authenticate(userEmail, userPassword)) {
      this.router.navigateByUrl("/products");
    } else {
      alert('Invalid email or password');
    }
  }

}
