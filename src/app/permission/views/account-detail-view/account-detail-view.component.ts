import {
    Component,
    OnInit,
    forwardRef,
    Inject
} from '@angular/core';
import { TerraSelectBoxValueInterface } from "@plentymarkets/terra-components";
import { Locale } from "angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";
import { AccountService } from '../../service/account.service';
import { PayPalUiComponent } from '../../../paypal-ui.component';
import { PermissionService } from '../../service/permission.service';

@Component({
               selector: 'accountDetails',
               template: require('./account-detail-view.component.html'),
               styles:   [require('./account-detail-view.component.scss')]
           })

export class AccountDetailViewComponent extends Locale implements OnInit
{
    private service:AccountService;
    private isLoading:boolean = true;
    private _permissionService;
    
    private email;
    private clientId;
    private clientSecret;
    
    private paymentAction;
    private paymentActionValues:Array<TerraSelectBoxValueInterface>;
    private environment;
    private environments:Array<TerraSelectBoxValueInterface>;
    private logo;
    private basket;
    private expressButton;
    
    private myValue:number;
    
    constructor(private accountService:AccountService,
                @Inject(forwardRef(() => PermissionService)) permissionService:PermissionService,
                @Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent,
                locale:LocaleService,
                localization:LocalizationService)
    {
        super(locale, localization);
        
        this.paymentActionValues = [
            {
                caption: this.localization.translate('sale'),
                value:   "Sale"
            }
            //{
            //    caption: this.localization.translate('authorization'),
            //    value:   "Authorization"
            //},
            //{
            //    caption: this.localization.translate('order'),
            //    value:   "Order"
            //}
        ];
        
        this.environments = [
            {
                caption: this.localization.translate('live'),
                value:   0
            },
            {
                caption: this.localization.translate('sandbox'),
                value:   1
            }
        ];
        
        this.service = accountService;
        this._permissionService = permissionService;
    }
    
    /*
     * belong to OnInit Lifecycle hook
     * get called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated
     */
    ngOnInit()
    {
        this.isLoading = false;
    }
    
    public saveAccount()
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);
        
        let data = {
            account: {
                [this._permissionService.currentAccountId]: this._permissionService.currentAccount
            }
        };
        
        this.service.saveAccount(data).subscribe(
            response =>
            {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('successSaveAccount'), 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },
            
            error =>
            {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorSaveAccount') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            }
        );
    }
    
    public deleteAccount()
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);
        
        let data = {accountId: this._permissionService.currentAccountId};
        
        this.service.deleteAccount(data).subscribe(
            response =>
            {
                
                this._permissionService.accountList = [];
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
                
                this._permissionService.modules.pop();
                
                this.payPalUiComponent.callStatusEvent(this.localization.translate('successDeleteAccount'), 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },
            
            error =>
            {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorDeleteAccount') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            }
        );
    }
}