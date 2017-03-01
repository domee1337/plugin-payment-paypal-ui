import { CommonModule } from '@angular/common';
import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app';
import { AccountSelectorViewComponent } from './account-selector-view.component';
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
              declarations: [AccountSelectorViewComponent]
          })
export class AccountSelectorViewModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule: AccountSelectorViewModule,
            
        };
    }
    
    static getMainComponent():string
    {
        return 'AccountSelectorViewComponent';
    }
}