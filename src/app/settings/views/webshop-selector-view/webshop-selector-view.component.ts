import {
    Component,
    OnInit
} from '@angular/core';

@Component({
               selector: 'setting-view',
               template: require('./webshop-selector-view.component.html'),
               styles:   [require('./webshop-selector-view.component.scss').toString()]
           })

export class WebShopSelectorComponent implements OnInit
{
    constructor()
    {}
    
    ngOnInit()
    {
        
    }
}

