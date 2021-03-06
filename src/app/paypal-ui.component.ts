import {
    Component,
    ChangeDetectionStrategy,
    ViewContainerRef
} from '@angular/core';
import { Locale } from 'angular2localization';
import {
    LocaleService,
    LocalizationService
} from 'angular2localization/angular2localization';

@Component({
               selector:        'paypal-ui',
               template:        require('./paypal-ui.component.html'),
               styles:          [require('./paypal-ui.component.scss')],
               changeDetection: ChangeDetectionStrategy.Default
           })

export class PayPalUiComponent extends Locale
{
    private action:any = this.getUrlVars()['action'];
    private _isLoading = true;
    private _viewContainerReference:ViewContainerRef;
    
    constructor(locale:LocaleService,
                localization:LocalizationService,
                private _viewContainerRef:ViewContainerRef)
    {
        super(locale, localization);
        
        this._viewContainerReference = _viewContainerRef;
        
        //Definitions for i18n
        if(process.env.ENV === 'production')
        {
            this.localization.translationProvider('assets/lang/locale_');
        }
        else
        {
            this.localization.translationProvider('src/app/assets/lang/locale_');
        }
        
        // this.locale.addLanguage('de');
        this.locale.addLanguage('en');
        this.locale.definePreferredLocale('en', 'EN', 30); //default language is en
        
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_') || 'de';
        
        this.locale.setCurrentLocale(langInLocalStorage, langInLocalStorage.toUpperCase());
        this.localization.updateTranslation();
    }
    
    private getUrlVars()
    {
        let vars = {};
        
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(substring:string, ...args:any[]):string
        {
            vars[args[0]] = args[1];
            return;
        });
        
        return vars;
    }
    
    public reload()
    {
        location.reload();
    }
    
    public get isLoading():boolean
    {
        return this._isLoading;
    }
    
    public set isLoading(v:boolean)
    {
        this._isLoading = v;
    }
    
    public callStatusEvent(message, type)
    {
        let detail = {
            type:    type,
            message: message
        };
        
        let customEvent:CustomEvent = new CustomEvent('status', {detail: detail});
        
        window.parent.window.parent.window.dispatchEvent(customEvent);
    }
    
    public callLoadingEvent(isLoading:boolean)
    {
        let detail = {
            isLoading: isLoading
        };
        
        let customEvent:CustomEvent = new CustomEvent('loadingStatus', {detail: detail});
        
        window.parent.window.parent.window.dispatchEvent(customEvent);
    }
}