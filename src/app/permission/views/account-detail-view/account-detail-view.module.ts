import { CommonModule } from '@angular/common';
import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app';
import { AccountDetailViewComponent } from './account-detail-view.component';
import {
    LocaleModule,
    LocalizationModule
} from 'angular2localization';
import { FormsModule } from '@angular/forms';

@NgModule({
              imports:      [
                  CommonModule,
                  LocaleModule,
                  LocalizationModule,
                  FormsModule,
                  TerraComponentsModule.forRoot()
              ],
              declarations: [AccountDetailViewComponent]
          })
export class AccountDetailViewModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule: AccountDetailViewModule
        };
    }
    
    static getMainComponent():string
    {
        return 'AccountDetailViewComponent';
    }
}