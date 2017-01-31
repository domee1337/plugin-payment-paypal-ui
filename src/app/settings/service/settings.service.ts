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
        super(loadingBarService, http, 'http://master.plentymarkets.com/');
    }
    
    public getSettings():Observable<any>
    {
        this.setAuthorization();
        
        let url:string;
        
        url = this.url + 'payment/payPal/settings/';
        
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
        
        url = this.url + 'rest/webstores/';
        
        this.headers.set('Authorization', 'Bearer NuQ33zCo8Mp3jU7Ws2g8asJMv9YWnX28JSCMZJhC');
        
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
        
        url = this.url + 'rest/orders/shipping/countries/';
        
        this.headers.set('Authorization', 'Bearer NuQ33zCo8Mp3jU7Ws2g8asJMv9YWnX28JSCMZJhC');
        
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
        
        this.headers.set('Authorization', 'Bearer NuQ33zCo8Mp3jU7Ws2g8asJMv9YWnX28JSCMZJhC');
        
        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }
}
