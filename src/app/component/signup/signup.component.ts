import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validators';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: any = FormGroup;
  profilePictureBase64: any;
  // submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private messageService: MessageService, private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required],
      profile: ['', Validators.required]
    },
    {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {return this.registerForm.controls}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePictureBase64 = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // onSubmit(){
  //   const postData = {...this.registerForm.value }
  //   delete postData.confirmPassword;
  //   this.authService.registerUser(postData as User).subscribe(
  //     res =>{
  //       console.log(res);
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Successfully' });
  //       this.registerForm.reset()
  //       this.router.navigateByUrl('/login');
  //     },
  //     err => {
  //       console.log(err);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
  //     }
  //   )

  //   Object.values(this.registerForm.controls).forEach((control:any) =>{
  //     control.markAsTouched();
  //   });

  //   if(this.registerForm.invalid){
  //     return
  //   }

  //   const userCredentials = {
  //     ...this.registerForm.value,
  //     profilePicture: this.profilePictureBase64 || 'cart.svg'
  //   };
  //   console.log(this.profilePictureBase64);
  //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
    
  //   localStorage.setItem('user_credentials', JSON.stringify(this.registerForm.value, null, 4));
  //   console.log(JSON.stringify(this.registerForm.value, null, 4));
  //   this.registerForm.reset();
  //   this.router.navigateByUrl('/login');
  // }
  onSubmit() {
    Object.values(this.registerForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    // if (this.registerForm.invalid) {
    //   return console.log('form data is invalid');
    // }
    
      const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
  
    this.authService.registerUser(postData as User).subscribe(
      res => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Successfully' });
        this.registerForm.reset();
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
    
  }
  
  

}