import {Component, OnInit, forwardRef, Inject, ViewChild} from '@angular/core';
import {
} from '@plentymarkets/terra-components/index';
import { AccountService } from "./service/account.service"
import { PayPalUiComponent } from "../paypal-ui.component";
import {PermissionService} from "../permission/service/permission.service";

@Component({
    selector: 'accountDetails',
    template: require('./accountDetails.component.html'),
    styles: [require('./accountDetails.component.scss').toString()]
})
export class AccountDetailsComponent implements OnInit
{
    private service:AccountService;
    private isLoading:boolean = true;
    private _permissionService;

    private email = "1";
    private clientId = "2";
    private clientSecret = "3";

    constructor(private S:AccountService,permissionService:PermissionService , @Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent)
    {
        this.service = S;
        this._permissionService = permissionService;
    }

    /*
     * belong to OnInit Lifecycle hook
     * get called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    ngOnInit()
    {
        var account = this._permissionService.account;
        this.email = account.email;
        this.clientId = account.clientId;
        this.clientSecret = account.clientSecret;
    }
}