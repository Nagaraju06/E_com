import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;

 

  constructor(private formBuilder : FormBuilder, private authService : AuthenticationService, private router: Router, private msgService: MessageService) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    // const userEmail = this.loginForm.value.email;
    // const userPassword = this.loginForm.value.password;

    // if (this.authService.authenticate(userEmail, userPassword)) {
    //   this.router.navigateByUrl("/products");
    // } else {
    //   alert('Invalid email or password');
    // }
    const {email, password} = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      res =>{
        if(res.length > 0 && res[0].password === password){
          alert('login details correct');
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully' });
          //this.router.navigateByUrl("/products");
          this.router.navigate(["/products"]);
          console.log('login')
        }
        else{
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or Password incorrect' });
          
        }
      },
      err =>{
        console.log(err)
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }

}
