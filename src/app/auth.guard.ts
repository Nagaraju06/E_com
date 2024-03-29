import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {
  const userCredentials = localStorage.getItem('user_credentials');
  const router = inject(Router)
  if(userCredentials){
    return true
  }
  else{
    router.navigate(['login']);
    return false;
  }
};
