import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { WebShopSelectorViewComponent } from './webshop-selector-view.component';

@NgModule({
              imports:      [
                  CommonModule,
                  TerraComponentsModule.forRoot()
              ],
              declarations: [
                  WebShopSelectorViewComponent
              ],
              exports:      [
                  WebShopSelectorViewComponent
              ]
          })
export class WebShopSelectorModule
{
    static forRoot()
    {
        return {
            ngModule:  WebShopSelectorModule,
            providers: [],
        };
    }
    
    static getMainComponent():string
    {
        return 'WebShopSelectorViewComponent';
    }
}
