import {
    Component,
    OnInit
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
    private _accountList:Array<TerraLeafInterface> = [];
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
        this.payPalUiComponent.callLoadingEvent(true);

        this.accountService.getAccounts().subscribe(
            response => {
                for (var account in response)
                {
                    this._accountList.push({
                        caption:     account,
                        icon:        'icon-user_my_account',
                        clickFunction: () => { this.showAccountDetails(response[account]); },
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

    private showAccountDetails(account:any):void
    {
        let details:TerraSplitViewInterface;

        details = {
            module:            AccountDetailsModule.forRoot(),
            defaultWidth:      '74%',
            hidden:            false,
            name:              AccountDetailsModule.getMainComponent(),
            mainComponentName: AccountDetailsModule.getMainComponent()
        };

        this._permissionService.addModule(details);
        this._permissionService.currentAccount = account;
    }
}