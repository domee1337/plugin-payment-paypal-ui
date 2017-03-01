import {
    Component,
    OnInit,
    forwardRef,
    Inject,
    Input
} from '@angular/core';
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
                                                defaultWidth:      'col-xs-2',
                                                hidden:            false,
                                                name:              'Filter',
                                                mainComponentName: WebShopSelectorModule.getMainComponent(),
                                                parameter:         {}
                                            });
    }
}
