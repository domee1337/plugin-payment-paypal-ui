import {
    Component,
    OnInit
} from '@angular/core';

@Component({
               selector: 'setting-view',
               template: require('./webshop-selector.component.html'),
               styles:   [require('./webshop-selector.component.scss').toString()]
           })

export class WebShopSelectorComponent implements OnInit
{
    constructor()
    {}
    
    ngOnInit()
    {
        
    }
}

