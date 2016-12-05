import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TerraLoadingBarService, TerraBaseService } from '@plentymarkets/terra-components';
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

        url = this.url + 'payPal/settings/';

        return this.mapRequest(
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }

    public saveSettings(data:any):Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payPal/settings/';

        return this.mapRequest(
            this.http.post(url, data, {headers: this.headers})
        );
    }

    public getWebstores():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'rest/webstores/';

        this.headers.set('Authorization', 'Bearer ODfSMa2BAGfj0H9tfvScsEos0clIUuTvQysmFRFy');

        return this.mapRequest(
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }


    public getShippingCountries():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'rest/orders/shipping/countries/';

        this.headers.set('Authorization', 'Bearer ODfSMa2BAGfj0H9tfvScsEos0clIUuTvQysmFRFy');

        return this.mapRequest(
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }
}