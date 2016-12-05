import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { PermissionService } from "./service/permission.service"
import { AccountListModule } from '../accounts/accountList.module';
import { PayPalUiComponent } from "../paypal-ui.component";
import { TerraOverlayComponent, TerraAlertComponent } from "@plentymarkets/terra-components";
import { Locale } from "angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";

@Component({
    selector: 'permissions',
    template: require('./permission.component.html'),
    styles: [require('./permission.component.scss').toString()]
})

export class PermissionComponent extends Locale implements OnInit
{
    private _permissionService;
    private isLoading:boolean = true;

    private email;
    private clientId;
    private clientSecret;

    private alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    @ViewChild('viewOverlayPayPalAddAccount') public viewOverlayPayPalAddAccount:TerraOverlayComponent;

    constructor(    permissionService:PermissionService,
                    private payPalUiComponent:PayPalUiComponent,
                    locale:LocaleService,
                    localization:LocalizationService)
    {
        super(locale, localization);

        this._permissionService = permissionService;
    }

    ngOnInit()
    {
        this.loadAccountListModule();

        this.payPalUiComponent.callLoadingEvent(false);
        this.payPalUiComponent.isLoading = false;
    }

    public openOverlayPayPalAddAccount():void
    {
        this.viewOverlayPayPalAddAccount.showOverlay();
    }

    public loadAccountListModule():void
    {
        this._permissionService.modules = [
            {
                module:            AccountListModule.forRoot(),
                defaultWidth:      '23.0%',
                hidden:            false,
                name:              this.localization.translate('accounts'),
                mainComponentName: AccountListModule.getMainComponent()
            }
        ];
    }

    public addPayPalAccount(overlay:TerraOverlayComponent):void
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);

        let data = {
            account: {
                email:          this.email,
                clientId:       this.clientId,
                clientSecret:   this.clientSecret
            }
        };

        this._permissionService.createAccount(data).subscribe(
            response => {

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
                for (let account in response)
                {
                    let acc = response[account];
                    this._permissionService.addAccount({
                        caption:     account,
                        icon:        'icon-user_my_account',
                        clickFunction: () => { this._permissionService.showAccountDetails(acc); },
                    });
                }

                overlay.hideOverlay();
            },

            error => {
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