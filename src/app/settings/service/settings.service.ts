import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    TerraLoadingBarService,
    TerraBaseService
} from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService extends TerraBaseService
{
    constructor(loadingBarService:TerraLoadingBarService, http:Http)
    {
<<<<<<< HEAD
        super(loadingBarService, http, '/');
=======
        //super(loadingBarService, http, 'http://master.plentymarkets.com/rest/');
        super(loadingBarService, http, '/rest/');
>>>>>>> ui_facelift
    }
    
    // TODO set parameter for paypal plus installment
    public getSettings(payPalMode:string):Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'payment/payPal/settings/' + payPalMode;
        
        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }
    
    public saveSettings(data:any):Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'payment/payPal/settings/';
        
        return this.mapRequest(
            this.http.post(url, data, {headers: this.headers})
        );
    }
    
    public getWebstores():Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'webstores/';
        
        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');
        
        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }
    
    
    public getShippingCountries():Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'orders/shipping/countries/';
        
        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');
        
        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }
    
    public getAccounts():Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'payment/payPal/accounts/';
        
        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');
        
        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }
}
