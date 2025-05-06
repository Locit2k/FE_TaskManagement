export class BaseResponse {
    public isError:boolean = true;
    public errorType:string = "";
    public messageError:string = "";
    public data:any = null;
}