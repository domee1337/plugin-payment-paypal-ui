import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TerraLoadingBarService, TerraBaseService } from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService extends TerraBaseService
{
    constructor(loadingBarService:TerraLoadingBarService, http:Http)
    {
        super(loadingBarService, http, 'http://master.plentymarkets.com/');
    }

    public getAccounts():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payPal/accounts/';

        return this.mapRequest
        (
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }

    public deleteAccount(data:any):Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payPal/account';

        return this.mapRequest(
            this.http.delete(url, {headers: this.headers, body: data})
        );
    }

    public saveAccount(data:any):Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payPal/account';

        return this.mapRequest(
            this.http.put(url, data, {headers: this.headers})
        );
    }
}