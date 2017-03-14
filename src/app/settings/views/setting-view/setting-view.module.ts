import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { SettingViewComponent } from './setting-view.component';
import {
    LocaleModule,
    LocalizationModule
} from 'angular2localization';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap';

@NgModule({
              imports:      [
                  CommonModule,
                  FormsModule,
                  LocaleModule,
                  LocalizationModule,
                  TerraComponentsModule.forRoot(),
                  TooltipModule.forRoot()
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
