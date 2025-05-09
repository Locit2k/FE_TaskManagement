import { Injectable } from '@angular/core';
import { Observable, tap, map, of, switchMap, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BaseResponse } from '../../models/BaseResponse.model';
import CryptoJS from 'crypto-js';
import { UserModel } from '../../models/UserModel.model';
import { LoginModel, RegisterModel } from '../../../pages/auth/models';
import { NotificationService } from '../notification/notification.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private encryptSecretKey = environment.encryptSecretKey;
  constructor(private cookieService: CookieService, private apiSV:ApiService, private router:Router, private notiSV:NotificationService) { }

  private setCookie(name: string, value: string, expireOn:Date | undefined): void {
    let cookie = this.getCookie(name);
    if(cookie)
    {
      this.cookieService.delete(name);
    }
    let data = this.encryptData(value);
    this.cookieService.set(name, data,expireOn,"/");
  }

  private getCookie(name: string): string {
    let value = "";
    let cookie = this.cookieService.get(name);
    if(cookie)
    {
      value = this.decryptData(cookie);
    }
    return value;
  }

  private setUser(data:any,remember:boolean = false){
    if(data)
    {
      let userName = data.userName;
      let token = data.token;
      let userExpireOn = undefined;
      let tokenExpireOn = undefined;
      if(remember)
      {
        userExpireOn = new Date();
        tokenExpireOn = new Date();
        userExpireOn.setDate(userExpireOn.getDate() + 30);
        tokenExpireOn.setMinutes(tokenExpireOn.getMinutes() + 5);
      }
      this.setCookie("tmus",userName,userExpireOn);
      this.setCookie("tmtk",token,tokenExpireOn);
    }
  }

  public getToken():string{
    let token = this.getCookie("tmtk");
    return token;
  }

  public refreshToken() : Observable<string | null> {
    let userName = this.getCookie("tmus");
    if(userName)
    {
      return this.apiSV.post<BaseResponse>("auth/refreshtoken",{userName: userName})
      .pipe(map((res: any) => {
        if(res && !res.isError && res.data)
        {
          this.setUser(res.data,true);
          return res.data.token;
        }
        else return null;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      }));
    }
    else return of(null);
  }

  public getUser() : Observable<UserModel | null> {
    return this.apiSV.get<BaseResponse>("user/getuser")
      .pipe(map((res) => {
        return res ? (res.data as UserModel) : null;
      }),
      catchError((error) => 
      {
        console.log(error);
        return of(null);
      }
    ));
  }

  encryptData(data:any) {
    try {
      if(!data || data == "") return "";
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      return "";
    }
  }

  decryptData(data:any) {
    try {
      if(!data || data == "") return "";
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return "";
    }
  }

  public login(data:LoginModel) : Observable<boolean> {
    if(!data){
      return of(false);
    }
    return this.apiSV.post<BaseResponse>("auth/login",data)
    .pipe(map((res) => {
      if(res && !res.isError && res.data)
      {
        this.setUser(res.data, data.rememberme);
        this.notiSV.notify("Đăng nhập thành công");
        return true;
      }
      else
      {
        this.notiSV.notify(res.messageError,res.errorType);
        return false;
      }
    }),
    catchError((error) => {
      console.log(error);
      this.notiSV.notify('Hệ thống thực thi không thành công. Vui lòng thử lại sau.', 'error');
      return of(false);
    }));
  }

  public logOut(){
    this.cookieService.delete("tmtk");
    this.cookieService.delete("tmus");
    this.router.navigateByUrl("auth/login");
  }

  public register(data:RegisterModel) : Observable<boolean> {
    if(!data) return of(false);
    return this.apiSV.post<BaseResponse>("auth/register",data)
    .pipe(map((res) => {
      if(res && !res.isError && res.data)
      {
        this.setUser(res.data);
        this.notiSV.notify("Đăng ký thành công.");
        return true;
      }
      else
      {
        this.notiSV.notify(res.messageError,res.errorType)
        return false;
      }
    }),
    catchError((error) => {
      console.log(error);
      this.notiSV.notify('Hệ thống thực thi không thành công. Vui lòng thử lại sau.', 'error');
      return of(false);
    }));
  }
}
