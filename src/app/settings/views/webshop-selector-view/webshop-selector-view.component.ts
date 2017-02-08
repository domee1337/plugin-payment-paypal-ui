import {
    Component,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '@plentymarkets/terra-components';
import { SettingsService } from '../../service/settings.service';
import { SplitViewService } from '../../service/split-view.service';
import { SettingViewModule } from '../setting-view/setting-view.module';

@Component({
               selector: 'setting-view',
               template: require('./webshop-selector-view.component.html'),
               styles:   [require('./webshop-selector-view.component.scss')]
           })

export class WebShopSelectorViewComponent implements OnInit
{
    private _webStoresList:Array<TerraLeafInterface>;
    
    constructor(private settingsService:SettingsService,
                private _splitViewService:SplitViewService)
    {
    }
    
    ngOnInit()
    {
        let list:Array<TerraLeafInterface> = [];
        
        this.settingsService
            .getWebstores()
            .subscribe(res =>
                       {
                           res.forEach((store) =>
                                       {
                                           list.push({
                                                         value:         store.storeIdentifier,
                                                         caption:       store.name,
                                                         clickFunction: () =>
                                                                        {
                                                                            this._splitViewService
                                                                                .addModule({
                                                                                               module:            SettingViewModule.forRoot(),
                                                                                               defaultWidth:      '84%',
                                                                                               hidden:            false,
                                                                                               name:              'Setting',
                                                                                               mainComponentName: SettingViewModule.getMainComponent(),
                                                                                               parameter:         {
                                                                                                   PID:          store.storeIdentifier,
                                                                                                   settingsMode: this._splitViewService.settingMode
                                                                                               }
                                                                                           });
                                                                        }
                                                     });
                                       });
                       }
            );
        
        this._webStoresList = [
            {
                caption:     'Mandanten',
                subLeafList: list
            }
        ];
        
    }
}

