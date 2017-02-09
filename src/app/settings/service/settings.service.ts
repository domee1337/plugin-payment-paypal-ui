import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TerraLoadingBarService, TerraBaseService } from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService extends TerraBaseService
{
    constructor(loadingBarService:TerraLoadingBarService, http:Http)
    {
        super(loadingBarService, http, '/');
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

        this.headers.set('Authorization', 'Bearer nnqSYt9AM29Uv49seRUK8zBc5hi3Y5kuFUghafWO');

        return this.mapRequest(
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }


    public getShippingCountries():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'rest/orders/shipping/countries/';

        this.headers.set('Authorization', 'Bearer nnqSYt9AM29Uv49seRUK8zBc5hi3Y5kuFUghafWO');

        return this.mapRequest(
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }
}