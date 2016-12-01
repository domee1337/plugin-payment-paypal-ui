import { Injectable } from '@angular/core';
import {
    TerraSplitViewInterface,
    TerraBaseService, TerraLoadingBarService
} from "@plentymarkets/terra-components";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class PermissionService extends TerraBaseService
{
    constructor(loadingBarService:TerraLoadingBarService, http:Http)
    {
        super(loadingBarService, http, 'http://master.plentymarkets.com/');
    }

    private _modules:Array<TerraSplitViewInterface> = [];
    private _currentAccount:any;

    public get modules():Array<TerraSplitViewInterface>
    {
        return this._modules;
    }

    public set modules(value:Array<TerraSplitViewInterface>)
    {
        this._modules = value;
    }

    public addModule(module:TerraSplitViewInterface):void
    {
        if(this._modules.length > 1)
        {
            this._modules.pop();
        }
        this._modules.push(module);
    }

    public get currentAccount():any
    {
        return this._currentAccount;
    }

    public set currentAccount(account:any)
    {
        this._currentAccount = account;
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

    public createAccount(data:any):Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payPal/account/';

        return this.mapRequest(
            this.http.post(url, data, {headers: this.headers})
        );
    }
}