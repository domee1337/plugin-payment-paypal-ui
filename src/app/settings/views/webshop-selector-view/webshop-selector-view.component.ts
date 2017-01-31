import {
    Component,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '@plentymarkets/terra-components';
import { SettingsService } from '../../service/settings.service';

@Component({
               selector: 'setting-view',
               template: require('./webshop-selector-view.component.html'),
               styles:   [require('./webshop-selector-view.component.scss')]
           })

export class WebShopSelectorViewComponent implements OnInit
{
    private _webStoresList:Array<TerraLeafInterface>;
    
    constructor(private settingsService:SettingsService,)
    {
    }
    
    ngOnInit()
    {
        let list = [];
        
        this.settingsService
            .getWebstores()
            .subscribe(res =>
                       {
                           res.forEach((store) =>
                                       {
                                           list.push({
                                                         value:   store.storeIdentifier,
                                                         caption: store.name
                                                     });
                                       });
                       }
            );
        
        this._webStoresList = [
            {
                caption:     'Webstores',
                subLeafList: list
            }
        ];
        
    }
}

