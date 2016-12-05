import {
    Component,
    OnInit,
    forwardRef,
    Inject
} from '@angular/core';
import { AccountService } from "./service/account.service"
import { PayPalUiComponent } from "../paypal-ui.component";
import { PermissionService } from "../permission/service/permission.service";
import { TerraSelectBoxValueInterface } from "@plentymarkets/terra-components";
import { Locale } from "angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";

@Component({
    selector: 'accountDetails',
    template: require('./accountDetails.component.html'),
    styles: [require('./accountDetails.component.scss').toString()]
})
export class AccountDetailsComponent extends Locale implements OnInit
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

    constructor(    private accountService:AccountService,
                    @Inject(forwardRef(() => PermissionService)) permissionService:PermissionService,
                    @Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent,
                    locale:LocaleService,
                    localization:LocalizationService)
    {
        super(locale, localization);

        this.service = accountService;
        this._permissionService = permissionService;

        this.paymentActionValues = [
            {
                caption:    this.localization.translate('sale'),
                value:      "Sale"
            },
            {
                caption:    this.localization.translate('authorization'),
                value:      "Authorization"
            },
            {
                caption:    this.localization.translate('order'),
                value:      "Order"
            }
        ];

        this.environments = [
            {
                caption:    this.localization.translate('sandbox'),
                value:      1
            },
            {
                caption:    this.localization.translate('live'),
                value:      0
            }
        ];
    }

    /*
     * belong to OnInit Lifecycle hook
     * get called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    ngOnInit()
    {
        var account = this._permissionService.currentAccount;
        this.email = account.email;
        this.clientId = account.clientId;
        this.clientSecret = account.clientSecret;

        this.isLoading = false;
    }

    public saveAccount()
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);

        let account = {
            email:          this.email,
            clientId:       this.clientId,
            clientSecret:   this.clientSecret,
            logo:           this.logo,
            basket:         this.basket,
            environment:    this.environment,
            paymentAction:  this.paymentAction,
            expressButton:  this.expressButton
        };

        let data = {
            accountId: {
                [this.email] : account
            }
        };

        this.service.saveAccount(data).subscribe(
            response => {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('successSaveAccount'), 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },

            error => {
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

        let data = { accountId: this.email};

        this.service.deleteAccount(data).subscribe(
            response => {

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

                this._permissionService.modules.pop();

                this.payPalUiComponent.callStatusEvent(this.localization.translate('successDeleteAccount'), 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },

            error => {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorDeleteAccount') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            }
        );
    }
}