import {
    Component,
    OnInit, Injectable
} from '@angular/core';
import {
    TerraLeafInterface, TerraSplitViewInterface
} from '@plentymarkets/terra-components/index';
import {PermissionService} from "../permission/service/permission.service";
import {AccountDetailsModule} from "./accountDetails.module";
import {AccountService} from "./service/account.service";
import {PayPalUiComponent} from "../paypal-ui.component";

@Component({
    selector: 'accountList',
    template: require('./accountList.component.html'),
    styles: [require('./accountList.component.scss').toString()]
})
export class AccountListComponent implements OnInit
{
    private _permissionService;
    private accountService;
    private isLoading:boolean = true;

    constructor(permissionService:PermissionService, accountService:AccountService, private payPalUiComponent:PayPalUiComponent)
    {
        this._permissionService = permissionService;
        this.accountService = accountService;
    }

    ngOnInit()
    {
        this.loadAccountList();
    }

    private loadAccountList()
    {
        this._permissionService.accountList = [];

        this.payPalUiComponent.callLoadingEvent(true);

        this.accountService.getAccounts().subscribe(
            response => {
                for (let account in response)
                {
                    let acc = response[account];
                    this._permissionService.addAccount({
                        caption:     account,
                        icon:        'icon-user_my_account',
                        clickFunction: () => { this._permissionService.showAccountDetails(acc); },
                    });
                }

                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            },

            error => {
                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.callStatusEvent('Could not load settings: ' + error.statusText, 'danger');
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            }
        );
    }
}