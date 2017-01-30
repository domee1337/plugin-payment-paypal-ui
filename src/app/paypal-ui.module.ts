import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/';
import { PayPalUiComponent }   from './paypal-ui.component';
import { SettingsComponent }   from './settings/settings.component';
import { SettingsService }   from './settings/service/settings.service';
import { PermissionComponent } from './permission/permission.component';
import { PermissionService }   from './permission/service/permission.service';
import { AccountListComponent } from './accounts/accountList.component';
import { AccountDetailsComponent } from './accounts/accountDetails.component';
import { AccountService } from './accounts/service/account.service';
import { LocaleModule } from "angular2localization/angular2localization";
import { LocalizationModule } from "angular2localization/angular2localization";
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";
import { WebShopSelectorModule } from './settings/views/webshop-selector-view/webshop-selector-view.module';
import { SettingViewModule } from './settings/views/setting-view/setting-view.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        LocaleModule,
        LocalizationModule,
        
        WebShopSelectorModule.forRoot(),
        //SettingViewModule.forRoot(),

        TerraComponentsModule.forRoot()
    ],
    declarations: [
        PayPalUiComponent,
        SettingsComponent,
        PermissionComponent,
        AccountListComponent,
        AccountDetailsComponent
    ],

    providers: [
        SettingsService,
        PermissionService,
        AccountService,
        LocaleService,
        LocalizationService
    ],

    bootstrap: [
        PayPalUiComponent
    ]
})

export class PayPalUiModule
{
}