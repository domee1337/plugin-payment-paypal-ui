import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { WebShopSelectorComponent } from './webshop-selector.component';

@NgModule({
              imports:      [
                  CommonModule,
                  TerraComponentsModule.forRoot()
              ],
              declarations: [
                  WebShopSelectorComponent
              ],
              exports:      [
                  WebShopSelectorComponent
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
}
