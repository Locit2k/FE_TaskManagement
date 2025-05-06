import { Injectable } from '@angular/core';
import { Observable, tap, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BaseResponse } from '../../models/BaseResponse.model';
import CryptoJS from 'crypto-js';
import { UserModel } from '../../models/UserModel.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private encryptSecretKey = environment.encryptSecretKey;
  constructor(private cookieService: CookieService,private apiSV:ApiService, private router:Router) { }

  private setCookie(name: string, value: string, expireOn:Date): void {
    let cookie = this.getCookie(name);
    if(cookie)
    {
      this.cookieService.delete(name);
    }
    let data = this.encryptData(value);
    this.cookieService.set(name, data, expireOn);
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

  public setToken(token:string){
    if(token)
    {
      var expireOn = new Date();
      expireOn.setMinutes(expireOn.getMinutes() + 30);
      this.setCookie("tmtk",token,expireOn);
    }
  }

  public getToken():string{
    let token = this.getCookie("tmtk");
    return token;
  }

  public refreshToken() : Observable<string | null>{
    return this.apiSV.post("auth/refreshtoken",{},{ withCredentials: true }).pipe(
      tap((response: any) => {
        this.setToken(response.accessToken);
      })
    );
  }

  public getUser() : Observable<UserModel | null>{
    let token = this.getToken();
    if(token)
    {
      return this.apiSV.get<BaseResponse>("user/getuser").pipe(map((res) => {
        return res.data as UserModel;
      }));
    }
    else
    {
      return of(null);
    }
  }

  public logOut(){
    this.cookieService.delete("tmtk");
    this.router.navigateByUrl("auth/login");
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
}
