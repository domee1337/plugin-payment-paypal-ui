import {
    Component,
    OnInit,
    forwardRef,
    Inject
} from '@angular/core';
import { TerraSplitViewInterface } from '@plentymarkets/terra-components/index';
import { SettingViewModule } from './views/setting-view/setting-view.module';
import { WebShopSelectorModule } from './views/webshop-selector-view/webshop-selector-view.module';
import { PayPalUiComponent } from '../paypal-ui.component';

@Component({
               selector: 'settings',
               template: require('./settings.component.html'),
               styles:   [require('./settings.component.scss').toString()]
           })

export class SettingsComponent implements OnInit
{
    private _modules:Array<TerraSplitViewInterface> = new Array;
    
    constructor(@Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent,)
    {
        this.payPalUiComponent.callLoadingEvent(false);
        this.payPalUiComponent.isLoading = false;
    }
    
    ngOnInit()
    {
        this._modules.push({
                               module:            WebShopSelectorModule.forRoot(),
                               defaultWidth:      '15%',
                               hidden:            false,
                               name:              'Filter',
                               mainComponentName: 'WebShopSelectorComponent'
                           });
        
        this._modules.push({
                               module:            SettingViewModule.forRoot(),
                               defaultWidth:      '85%',
                               hidden:            false,
                               name:              'Setting',
                               mainComponentName: 'SettingViewComponent'
                           });
    }
    
    public get modules():Array<TerraSplitViewInterface>
    {
        return this._modules;
    }
    
    public set modules(value:Array<TerraSplitViewInterface>)
    {
        this._modules = value;
    }
}
