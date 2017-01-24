import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { SettingViewComponent } from './setting-view.component';
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
}
