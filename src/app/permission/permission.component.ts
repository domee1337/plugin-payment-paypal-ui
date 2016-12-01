import {Component, OnInit, ViewChild} from '@angular/core';
import { PermissionService } from "./service/permission.service"
import { AccountListModule } from '../accounts/accountList.module';
import { PayPalUiComponent } from "../paypal-ui.component";
import { TerraOverlayComponent } from "@plentymarkets/terra-components";

@Component({
    selector: 'permissions',
    template: require('./permission.component.html'),
    styles: [require('./permission.component.scss').toString()]
})

export class PermissionComponent implements OnInit
{
    private _permissionService;
    private isLoading:boolean = true;

    private email;
    private clientId;
    private clientSecret;

    @ViewChild('viewOverlayPayPalAddAccount') public viewOverlayPayPalAddAccount:TerraOverlayComponent;

    constructor(permissionService:PermissionService, private payPalUiComponent:PayPalUiComponent)
    {
        this._permissionService = permissionService;
    }

    ngOnInit()
    {
        this._permissionService.addModule(
            {
                module:            AccountListModule.forRoot(),
                defaultWidth:      '23.0%',
                hidden:            false,
                name:              'Konten',
                mainComponentName: AccountListModule.getMainComponent()
            });

        this.payPalUiComponent.callLoadingEvent(false);
        this.payPalUiComponent.isLoading = false;
    }

    public openOverlayPayPalAddAccount():void
    {
        this.viewOverlayPayPalAddAccount.showOverlay();
    }

    public addPayPalAccount():void
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
                this.payPalUiComponent.callStatusEvent('Settings saved successfully', 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },

            error => {
                this.payPalUiComponent.callStatusEvent('Could not save settings: ' + error.statusText, 'danger');
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