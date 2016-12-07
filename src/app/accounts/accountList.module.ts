import { CommonModule } from '@angular/common';
import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app';
import { AccountListComponent } from './accountList.component';
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
              declarations: [AccountListComponent]
          })
export class AccountListModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  AccountListModule,

        };
    }
    
    static getMainComponent():string
    {
        return 'AccountListComponent';
    }
}