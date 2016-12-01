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

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        LocaleModule,
        LocalizationModule,

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
        LocalizationService,
    ],

    bootstrap: [
        PayPalUiComponent
    ]
})

export class PayPalUiModule
{
}