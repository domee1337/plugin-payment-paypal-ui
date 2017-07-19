import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    TerraBaseService,
    TerraLoadingSpinnerService
} from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService extends TerraBaseService
{
    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
                private _http:Http)
    {
        super(_loadingSpinnerService, _http, '/rest/');
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

    public setAuthorization()
    {
      this.setToHeader('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE1NWM3N2M5MWI1ZWQzZTc5ZGFmOTcwYWQ3Y2MyMjZhMDk2YjFlOTA0M2IyYTYwYTg1YTRlZjQxYWQ1NGNiMjRiMDgwMmE3YzJiNWI4MWJhIn0.eyJhdWQiOiIxIiwianRpIjoiMTU1Yzc3YzkxYjVlZDNlNzlkYWY5NzBhZDdjYzIyNmEwOTZiMWU5MDQzYjJhNjBhODVhNGVmNDFhZDU0Y2IyNGIwODAyYTdjMmI1YjgxYmEiLCJpYXQiOjE1MDA0NTMxNjMsIm5iZiI6MTUwMDQ1MzE2MywiZXhwIjoxNTAwNTM5NTYzLCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.gugqFUWn0QrdqghOsABQaTCu-GYbSfsmnNn3AoqoFktVSo217gkI9I5vhVf0yTMEF7HAXnV2eVUkEApf7oOun7XCiZhOMa_h8A1H1U4sHJvsBNJ9GKTs0ZewzjW8lesbEjZiHkwGjq0Jiq0rbNyCzrcvo4SYXTCVgcXfqhGqysuB0MqqlySxJb37UT_Fcs3wGv-KVpqatO4VQIwf8cJcFsa52UUmlGDlA_F7ZhdavHFmN1hwNo_3IMPSAAcKfcnIyxjKrxNrgIiHT9wU2oVCwlchtBUxDiKBSSp-cDrMJHA_lrQtCuXZSjo-g7yQzok2gy9y7JoSUr0VyAMB156TPhxMSz8lJsjjmyy8OIhY_ErPY3yuuASnr-ntB0xet9ye3mcbmH47cZYhuMIXlSI_oBuDFp0N-fVTPYVkPqI5lhHORmS0MDk2JrGRMCMvTXs2cyXd5mP-0JawJYmk0CqG1NpTIJgibOaKNkY6f19GglsgdiQe2Mj7mNd1YX1-HdX43PQWgJsRqgbYiz0WbyOygEGF4lIquzM0JHY7rr9Pu6DxcWiNYRs2_OL9WrWeNMlgifE7uag2BaedHiKUoXlixBePpGh3qzGh63-YNSRGun6uQ02uEFjNz2TF7dUelmVlgsAsbDaePYy9rPdPongHG7mV-7RL5Ga-A3HixRTvSik');
    }
}
