import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { RegisterModel } from '../models';
import { ApiService } from '../../../core/services/api/api.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { take } from 'rxjs';
const modules = [
  ButtonModule,
  InputTextModule,
  PasswordModule,
  FormsModule,
  RouterModule,
  RippleModule,
  AppFloatingConfigurator,
  MessageModule,
  CommonModule,
  ReactiveFormsModule,
  FluidModule,
  RadioButtonModule,
  DatePickerModule
]
@Component({
  selector: 'app-register',
  imports: [modules],
  providers:[ApiService,NotificationService,AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!:FormGroup;
  genders = [
      { name: 'Nam', code: 'Nam' },
      { name: 'Nữ', code: 'Nữ' },
  ];
  constructor(
    private apiSV:ApiService,
    private authSV:AuthService,
    private notiSV:NotificationService,
    public router:Router,
  )
  {
    this.router.navigateByUrl
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      fullName : new FormControl("",Validators.required),
      gender : new FormControl("",Validators.required),
      birthday : new FormControl(undefined,Validators.required),
      email : new FormControl("",[Validators.required,Validators.email]),
      phone : new FormControl("",[Validators.required,Validators.pattern('^[0-9]{10,15}$')]),
      userName : new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      password : new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(20)])
    });
  }

  onSignUp(){
    let data = this.form.value as RegisterModel;
    if(!data) return;
    if(!data.fullName)
    {
      this.notiSV.notify("Họ tên không được bỏ trống!","warn");
      return;
    }
    if(!data.gender)
    {
      this.notiSV.notify("Giới tính không được bỏ trống!","warn");
      return;
    }
    if(!data.birthday)
    {
      this.notiSV.notify("Ngày sinh không được bỏ trống!","warn");
      return;
    }
    if(!data.phone)
    {
      this.notiSV.notify("Số điện thoại không được bỏ trống!","warn");
      return;
    }
    if(!data.email)
    {
      this.notiSV.notify("Email không được bỏ trống!","warn");
      return;
    }
    if(!data.userName)
    {
      this.notiSV.notify("Tài khoản không được bỏ trống!","warn");
      return;
    }
    if(!data.password)
    {
      this.notiSV.notify("Mật khẩu không được bỏ trống!","warn");
      return;
    }
    this.authSV.register(data)
    .subscribe((res) => {
      if(res)
      {
        this.router.navigateByUrl("task");
      }
    });
  }
}
