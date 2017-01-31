import {
    Component,
    OnInit
} from '@angular/core';
import { Locale } from "angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";
import { PayPalUiComponent } from '../../../paypal-ui.component';
import { AccountService } from '../../service/account.service';
import { PermissionService } from '../../service/permission.service';

@Component({
               selector: 'accountList',
               template: require('./account-selector-view.component.html'),
               styles:   [require('./account-selector-view.component.scss')]
           })

export class AccountSelectorViewComponent extends Locale implements OnInit
{
    private _permissionService;
    private accountService;
    private isLoading:boolean = true;
    
    constructor(permissionService:PermissionService,
                accountService:AccountService,
                private payPalUiComponent:PayPalUiComponent,
                locale:LocaleService,
                localization:LocalizationService)
    {
        super(locale, localization);
        
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
            response =>
            {
                for(let accountId in response)
                {
                    let account = response[accountId];
                    this._permissionService.addAccount({
                                                           caption:       account.email,
                                                           icon:          'icon-user_my_account',
                                                           clickFunction: () =>
                                                                          {
                                                                              this._permissionService.showAccountDetails(accountId, account);
                                                                          },
                                                       });
                }
                
                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            },
            
            error =>
            {
                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadAccounts') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            }
        );
    }
}