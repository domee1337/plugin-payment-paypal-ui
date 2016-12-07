import { CommonModule } from '@angular/common';
import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app';
import { AccountDetailsComponent } from './accountDetails.component';
import {
    LocaleModule,
    LocalizationModule
} from 'angular2localization';

@NgModule({
              imports:      [
                  CommonModule,
                  LocaleModule,
                  LocalizationModule,
                  TerraComponentsModule.forRoot()
              ],
              declarations: [AccountDetailsComponent]
          })
export class AccountDetailsModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  AccountDetailsModule
        };
    }
    
    static getMainComponent():string
    {
        return 'AccountDetailsComponent';
    }
}