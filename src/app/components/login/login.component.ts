import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Module } from 'module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email=new FormControl("",[
  Validators.required,
  Validators.email
])
password=new FormControl("",[
  Validators.required,
  Validators.minLength(6)
])
loginForm=new FormGroup(
  {
    email:this.email,
    password:this.password
  }
)
constructor(private authService:AuthService,private router:Router){}
login(){
  this.authService.loginUser(this.loginForm.value.email!,this.loginForm.value.password!)

  
}
reset(){
  this.loginForm.reset()
}
}
