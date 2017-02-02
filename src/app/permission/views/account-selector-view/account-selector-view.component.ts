import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { Locale } from "angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";
import { PayPalUiComponent } from '../../../paypal-ui.component';
import { AccountService } from '../../service/account.service';
import { PermissionService } from '../../service/permission.service';
import {
    TerraOverlayComponent,
    TerraOverlayButtonInterface,
    TerraAlertComponent
} from '@plentymarkets/terra-components';

@Component({
               selector: 'accountList',
               template: require('./account-selector-view.component.html'),
               styles:   [require('./account-selector-view.component.scss')]
           })

export class AccountSelectorViewComponent extends Locale implements OnInit
{
    @ViewChild('viewOverlayPayPalAddAccount') public viewOverlayPayPalAddAccount:TerraOverlayComponent;
    
    private _permissionService;
    private accountService;
    
    private isLoading:boolean = true;
    
    private _addAccountButton:TerraOverlayButtonInterface;
    private _closeButton:TerraOverlayButtonInterface;
    
    private email;
    private clientId;
    private clientSecret;
    
    private alert:TerraAlertComponent = TerraAlertComponent.getInstance();
    
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
        
        this._addAccountButton = {
            icon:          'icon-confirm',
            caption:       'Add',
            isDisabled:    false,
            clickFunction: () => this.addPayPalAccount(this.viewOverlayPayPalAddAccount)
        };
        
        this._closeButton = {
            icon:          'icon-confirm',
            caption:       'Close',
            isDisabled:    false,
            clickFunction: () => this.closeOverlay(this.viewOverlayPayPalAddAccount)
        };
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
    
    public openOverlayPayPalAddAccount():void
    {
        this.viewOverlayPayPalAddAccount.showOverlay();
    }
    
    public addPayPalAccount(overlay:TerraOverlayComponent):void
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);
        
        let data = {
            account: {
                email:        this.email,
                clientId:     this.clientId,
                clientSecret: this.clientSecret
            }
        };
        
        this._permissionService.createAccount(data).subscribe(
            response =>
            {
                
                this.payPalUiComponent.callStatusEvent(this.localization.translate('successCreateAccount'), 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
                
                this.alert.addAlert({
                                        msg:              this.localization.translate('addAccountSuccessfully'),
                                        closable:         true,
                                        type:             'success',
                                        dismissOnTimeout: 0
                                    });
                
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
                
                overlay.hideOverlay();
            },
            
            error =>
            {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorCreateAccount') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            }
        );
    }
    
    public closeOverlay(overlay:TerraOverlayComponent):void
    {
        overlay.hideOverlay();
    }
}