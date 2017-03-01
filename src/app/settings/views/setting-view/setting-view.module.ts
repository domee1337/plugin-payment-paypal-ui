import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { SettingViewComponent } from './setting-view.component';
import {
    LocaleModule,
    LocalizationModule
} from 'angular2localization';
import { FormsModule } from '@angular/forms';

@NgModule({
              imports:      [
                  CommonModule,
                  FormsModule,
                  LocaleModule,
                  LocalizationModule,
                  TerraComponentsModule.forRoot()
              ],
              declarations: [
                  SettingViewComponent
              ],
              exports:      [
                  SettingViewComponent
              ]
          })
export class SettingViewModule
{
    static forRoot()
    {
        return {
            ngModule:  SettingViewModule,
            providers: [],
        };
    }
    
    static getMainComponent():string
    {
        return 'SettingViewComponent';
    }
}
