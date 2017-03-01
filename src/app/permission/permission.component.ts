import {
    Component,
    OnInit
} from '@angular/core';
import { PermissionService } from "./service/permission.service"
import { PayPalUiComponent } from "../paypal-ui.component";

import { Locale } from "angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";
import { AccountSelectorViewModule } from './views/account-selector-view/account-selector-view.module';

@Component({
               selector: 'permissions',
               template: require('./permission.component.html'),
               styles:   [require('./permission.component.scss')]
           })

export class PermissionComponent extends Locale implements OnInit
{
    private _permissionService;
    private isLoading:boolean = true;
    
    constructor(permissionService:PermissionService,
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
    
    public loadAccountListModule():void
    {
        this._permissionService.modules = [
            {
                module:            AccountSelectorViewModule.forRoot(),
                defaultWidth:      'col-xs-2',
                hidden:            false,
                name:              this.localization.translate('accounts'),
                mainComponentName: AccountSelectorViewModule.getMainComponent(),
                parameter:         {}
            }
        ];
    }
}
