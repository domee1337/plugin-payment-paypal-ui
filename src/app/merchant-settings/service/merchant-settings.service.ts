import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TerraLoadingBarService, TerraBaseService } from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';

@Injectable()
export class MerchantSettingsService extends TerraBaseService {
constructor(loadingBarService:TerraLoadingBarService, http:Http) {
        super(loadingBarService, http, '/paypal/merchant-settings/');
    }

    public getMerchantSettings():Observable<any> {
        this.setAuthorization();

        let url:string;

        url = this.url + 'all';

        return this.mapRequest(
            this.http.get(url, {headers: this.headers, body: ''})
        );
    }

    public saveMerchantSettings(data:any):Observable<any> {
        this.setAuthorization();

        let url:string;

        url = this.url + 'save';

        return this.mapRequest(
            this.http.post(url, data, {headers: this.headers})
        );
    }
}