import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    TerraBaseService,
    TerraLoadingSpinnerService
} from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';
import { AccountInterface } from './data/account.interface';

@Injectable()
export class AccountService extends TerraBaseService
{
    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
                private _http:Http)
    {
        super(_loadingSpinnerService, _http, '/rest/payment/payPal/');
    }
    
    public getAccounts():Observable<Array<AccountInterface>>
    {
        this.setAuthorization();
        
        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');
        
        let url:string;
        
        url = this.url + 'accounts/';
        
        return this.mapRequest
                   (
                       this.http.get(url, {
                           headers: this.headers,
                           body:    ''
                       })
                   );
    }
    
    public deleteAccount(data:any):Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'account';
        
        return this.mapRequest(
            this.http.delete(url, {
                headers: this.headers,
                body:    data
            })
        );
    }
    
    public saveAccount(data:any):Observable<any>
    {
        this.setAuthorization();
        
        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');
        
        let url:string;
        
        url = this.url + 'account';
        
        return this.mapRequest(
            this.http.put(url, data, {headers: this.headers})
        );
    }
}
