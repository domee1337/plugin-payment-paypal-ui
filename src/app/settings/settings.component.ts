import {
    Component,
    OnInit,
    forwardRef,
    Inject,
    Input
} from '@angular/core';
import { TerraSplitViewInterface } from '@plentymarkets/terra-components/index';
import { SettingViewModule } from './views/setting-view/setting-view.module';
import { WebShopSelectorModule } from './views/webshop-selector-view/webshop-selector-view.module';
import { PayPalUiComponent } from '../paypal-ui.component';
import { SplitViewService } from './service/split-view.service';

@Component({
               selector: 'settings',
               template: require('./settings.component.html'),
               styles:   [require('./settings.component.scss')]
           })

export class SettingsComponent implements OnInit
{
    @Input() settingsMode:string;
    
    //private _modules:Array<TerraSplitViewInterface> = new Array;
    
    constructor(@Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent,
                private _splitViewService:SplitViewService)
    {
        this.payPalUiComponent.callLoadingEvent(false);
        this.payPalUiComponent.isLoading = false;
        
    }
    
    ngOnInit()
    {
        this._splitViewService.settingMode = this.settingsMode;
        
        this._splitViewService.modules.push({
                                                module:            WebShopSelectorModule.forRoot(),
                                                defaultWidth:      '15%',
                                                hidden:            false,
                                                name:              'Filter',
                                                mainComponentName: WebShopSelectorModule.getMainComponent(),
                                                parameter:         {}
                                            });
        
        //this._modules.push({
        //                       module:            SettingViewModule.forRoot(),
        //                       defaultWidth:      '84%',
        //                       hidden:            false,
        //                       name:              'Setting',
        //                       mainComponentName: SettingViewModule.getMainComponent(),
        //                       parameter:         {
        //                           settingsMode: this.settingsMode
        //                       }
        //
        //                   });
    }
    
    //public get modules():Array<TerraSplitViewInterface>
    //{
    //    return this._modules;
    //}
    //
    //public set modules(value:Array<TerraSplitViewInterface>)
    //{
    //    this._modules = value;
    //}
}
