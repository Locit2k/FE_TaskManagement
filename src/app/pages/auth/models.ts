export class LoginModel{
    public userName!:string;
    public password!:string;
    public rememberme:boolean = false;

}

export class RegisterModel{
    public fullName!:string;
    public gender!:string;
    public birthday!:Date;
    public phone!:string;
    public email!:string;
    public userName!:string;
    public password!:string;
}