import {Component, OnInit, forwardRef, Inject, ViewChild} from '@angular/core';
import {
    TerraMultiSelectBoxValueInterface,
    TerraSelectBoxValueInterface,
} from '@plentymarkets/terra-components/index';
import { SettingsService } from "./service/settings.service";
import { PayPalUiComponent } from "../paypal-ui.component";
import set = Reflect.set;
import { Locale } from 'angular2localization';
import { LocaleService } from "angular2localization/angular2localization";
import { LocalizationService } from "angular2localization/angular2localization";

@Component({
    selector: 'settings',
    template: require('./settings.component.html'),
    styles: [require('./settings.component.scss').toString()]
})
export class SettingsComponent extends Locale implements OnInit
{
    private service:SettingsService;
    private settings;

    private selectLang = 'de';
    private webstore = 1000;
    private name;
    private logo;
    private infoPage;
    private priority;
    private markup;

    private webstoreSelect;

    private isLoading:boolean = true;
    private languageValues:Array<TerraSelectBoxValueInterface>;
    private infoPageValues:Array<TerraSelectBoxValueInterface>;
    private logoValues:Array<TerraSelectBoxValueInterface>;
    private shippingCountryValues:Array<TerraMultiSelectBoxValueInterface> = [];
    private shippingCountries:Array<any> = [];
    private priorityValues:Array<TerraSelectBoxValueInterface>;
    private webstoreValues:Array<TerraSelectBoxValueInterface> = [];

    constructor(    private settingsService:SettingsService,
                    @Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent,
                    locale:LocaleService,
                    localization:LocalizationService)
    {
        super(locale, localization);

        this.service = settingsService;

        this.settings =
            {
                webstore:[]
            };

        this.markup = {
            webstore:
                {
                    flatDomestic: 0,
                    flatForeign: 0,
                    percentageDomestic: 0,
                    percentageForeign: 0,
                },
            statistic:
                {
                    flatDomestic: 0,
                    flatForeign: 0,
                    percentageDomestic: 0,
                    percentageForeign: 0,
                }
        };

        this.languageValues = [
            {
                value:      'de',
                caption:    this.localization.translate('german'),
            },
            {
                value:      'en',
                caption:    this.localization.translate('english')
            },
            {
                value:      'fr',
                caption:    this.localization.translate('french')
            },
            {
                value:      'es',
                caption:    this.localization.translate('spanish')
            }
        ];

        this.infoPageValues = [
            {
                value:      '0',
                caption:    '---'
            },
            {
                value:      '1',
                caption:    this.localization.translate('internalInfoPage')
            },
            {
                value:      '2',
                caption:    this.localization.translate('externalInfoPage')
            }
        ];

        this.logoValues = [
            {
                value:      '0',
                caption:    this.localization.translate('showDefaultLogo')
            },
            {
                value:      '1',
                caption:    this.localization.translate('showUploadedLogo')
            },
            {
                value:      '2',
                caption:    this.localization.translate('donotShowLogo')
            }
        ];

        this.priorityValues = [
            {
                value:      '1',
                caption:    '',
                icon:       'icon-rating_small_1'
            },
            {
                value:      '2',
                caption:    '',
                icon:       'icon-rating_small_02'
            },
            {
                value:      '3',
                caption:    '',
                icon:       'icon-rating_small_3'
            },
            {
                value:      '4',
                caption:    '',
                icon:       'icon-rating_small_4'
            },
            {
                value:      '5',
                caption:    '',
                icon:       'icon-rating_small_5'
            }
        ];
    }

    /*
     * belong to OnInit Lifecycle hook
     * get called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    ngOnInit()
    {
        this.loadWebstores();
    }

    public loadWebstores()
    {
        this.payPalUiComponent.callLoadingEvent(true);

        var value = [];
        this.service.getWebstores().subscribe(
            response => {
                response.forEach((store) => {
                    value.push({
                        value:      store.storeIdentifier,
                        caption:    store.name,
                        active:     true
                    });
                });
                this.webstoreValues = value;

                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;

                this.loadShippingCountries();
            },

            error => {
                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadWebstores') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            }
        );
    }

    public loadSettings()
    {
        this.payPalUiComponent.callLoadingEvent(true);

        this.service.getSettings().subscribe(
            response => {
                this.mapSettings(response);

                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            },

            error => {
                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadSettings') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            }
        );
    }

    public loadShippingCountries()
    {
        this.payPalUiComponent.callLoadingEvent(true);

        var value = [];
        this.service.getShippingCountries().subscribe(
            response => {
                response.forEach((shipping) => {
                    if(shipping['active'] == 1)
                    {
                        value.push({
                            value:      shipping['id'],
                            caption:    shipping['name'],
                            selected:   false
                        });
                    }
                });

                this.shippingCountryValues = value;

                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;

                this.loadSettings();
            },
            error => {
                this.payPalUiComponent.callLoadingEvent(false);
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadShippingCountries') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.isLoading = false;
                this.isLoading = false;
            }
        );
    }

    private mapSettings(response:any):void
    {
        if (typeof response !== 'undefined')
        {
            let settings = this.settings;

            for (var res in response)
            {
                for (var store in response[res])
                {
                    var PID = store.substr(4);
                    var aktStore = response[res][store];

                    this.checkWebstoreExist(PID);

                    if('markup' in aktStore)
                    {
                        if('webstore' in aktStore.markup)
                        {
                            settings.webstore[store].markup.webstore.flatDomestic = aktStore.markup.webstore.flatDomestic;
                            settings.webstore[store].markup.webstore.flatForeign = aktStore.markup.webstore.flatForeign;
                            settings.webstore[store].markup.webstore.percentageDomestic = aktStore.markup.webstore.percentageDomestic;
                            settings.webstore[store].markup.webstore.percentageForeign = aktStore.markup.webstore.percentageForeign;
                        }

                        if('statistic' in aktStore.markup)
                        {
                            settings.webstore[store].markup.statistic.flatDomestic = aktStore.markup.statistic.flatDomestic;
                            settings.webstore[store].markup.statistic.flatForeign = aktStore.markup.statistic.flatForeign;
                            settings.webstore[store].markup.statistic.percentageDomestic = aktStore.markup.statistic.percentageDomestic;
                            settings.webstore[store].markup.statistic.percentageForeign = aktStore.markup.statistic.percentageForeign;
                        }
                    }

                    if('priority' in aktStore)
                    {
                        settings.webstore[store].priority = aktStore.priority;
                    }

                    if('shippingCountries' in aktStore)
                    {
                        settings.webstore[store].shippingCountries = aktStore.shippingCountries;
                    }

                    if('language' in aktStore)
                    {
                        for (var lang in aktStore.language)
                        {
                            this.checkLanguageExist(PID, lang);
                            settings.webstore[store].language[lang] = aktStore.language[lang];
                        }
                    }
                }
            }
        }

        this.setCurrentData(this.webstore, this.selectLang);
    }

    private saveSettings():void
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);

        this.setGeneralData();
        this.setLanguageData();
        this.setMarkupData();

        let data = { settings: [] };

        for (var store in this.settings.webstore)
        {
            data.settings.push({
                [store] : this.settings.webstore[store]
            });
        }

        this.service.saveSettings(data).subscribe(
            response => {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('successSaveSettings') , 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },

            error => {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorSaveSettings') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            }
        );
    }

    private getSelectedShippingCountries():Array<any>
    {
        let shippingCountryList = [];

        this.shippingCountryValues.forEach((country) =>
        {
            if (country.selected === true)
            {
                shippingCountryList.push(country.value);
            }
        });

        return shippingCountryList;
    }

    private changeWebstore(event:TerraSelectBoxValueInterface)
    {
//        if(this.webstore != event.value)
//        {
            /**
             * General settings
             */
            this.setGeneralData();

            /**
             * Language settings
             */
            this.setLanguageData();

            /**
             * Markup settings
             */
            this.setMarkupData();

//        }
        this.webstore = event.value;

        this.setCurrentData();
    }

    private changeLanguage(event:TerraSelectBoxValueInterface)
    {
        if(this.selectLang != event.value)
        {
            this.setLanguageData();
        }

        this.selectLang = event.value;
        this.setCurrentData();
    }

    private checkWebstoreExist(webstore)
    {
        if(this.settings.webstore["PID_" + webstore] === undefined)
        {
            this.settings.webstore["PID_" + webstore] =
                {
                    language: {},
                    markup: {
                        webstore: {
                            flatDomestic: 0,
                            flatForeign: 0,
                            percentageDomestic: 0,
                            percentageForeign: 0,
                        },
                        statistic: {
                            flatDomestic: 0,
                            flatForeign: 0,
                            percentageDomestic: 0,
                            percentageForeign: 0,
                        }
                    },
                    priority: 0,
                    shippingCountries: []
                };
        }
    }

    private checkLanguageExist(webstore, language)
    {
        this.checkWebstoreExist(webstore);

        if(this.settings.webstore["PID_" + webstore.toString()].language[language] === undefined)
        {
            this.settings.webstore["PID_" + webstore].language[language] =
                {
                    name:       '',
                    logo:       '',
                    infoPage:   ''
                };
        }
    }

    private setGeneralData()
    {
        /**
         * Check if object is correct
         */
        this.checkWebstoreExist(this.webstore);

        /**
         * General settings
         */
        this.settings.webstore["PID_" + this.webstore].priority = this.priority;
        this.settings.webstore["PID_" + this.webstore].shippingCountries = this.shippingCountries;

    }

    private setLanguageData()
    {
        /**
         * Check if object is correct
         */
        this.checkLanguageExist(this.webstore, this.selectLang);

        /**
         * Language settings
         */
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].name = this.name;
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].logo = this.logo;
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].infoPage = this.infoPage;
    }

    private setMarkupData()
    {
        /**
         * Check if object is correct
         */
        this.checkWebstoreExist(this.webstore);

        /**
         * Markup settings
         */
        this.settings.webstore["PID_" + this.webstore].markup.webstore.flatDomestic = this.markup.webstore.flatDomestic;
        this.settings.webstore["PID_" + this.webstore].markup.webstore.flatForeign = this.markup.webstore.flatForeign;
        this.settings.webstore["PID_" + this.webstore].markup.webstore.percentageDomestic = this.markup.webstore.percentageDomestic;
        this.settings.webstore["PID_" + this.webstore].markup.webstore.percentageForeign = this.markup.webstore.percentageForeign;
        this.settings.webstore["PID_" + this.webstore].markup.statistic.flatDomestic = this.markup.statistic.flatDomestic;
        this.settings.webstore["PID_" + this.webstore].markup.statistic.flatForeign = this.markup.statistic.flatForeign;
        this.settings.webstore["PID_" + this.webstore].markup.statistic.percentageDomestic = this.markup.statistic.percentageDomestic;
        this.settings.webstore["PID_" + this.webstore].markup.statistic.percentageForeign = this.markup.statistic.percentageForeign;
    }

    private setCurrentData(webstore = null, lang = null)
    {
        if(webstore && lang)
        {
            this.webstore = webstore;
            this.selectLang = lang;
        }

        var store = "PID_" + this.webstore;
        if(store in this.settings.webstore)
        {
            this.priority = this.settings.webstore[store].priority;
            this.markup = {
                webstore:
                    {
                        flatDomestic: this.settings.webstore[store].markup.webstore.flatDomestic,
                        flatForeign: this.settings.webstore[store].markup.webstore.flatForeign,
                        percentageDomestic: this.settings.webstore[store].markup.webstore.percentageDomestic,
                        percentageForeign: this.settings.webstore[store].markup.webstore.percentageForeign,
                    },
                statistic:
                    {
                        flatDomestic: this.settings.webstore[store].markup.statistic.flatDomestic,
                        flatForeign: this.settings.webstore[store].markup.statistic.flatForeign,
                        percentageDomestic: this.settings.webstore[store].markup.statistic.percentageDomestic,
                        percentageForeign: this.settings.webstore[store].markup.statistic.percentageForeign,
                    }
            };

            this.shippingCountries = this.settings.webstore[store].shippingCountries;
            if(this.selectLang in this.settings.webstore[store].language)
            {
                this.infoPage = this.settings.webstore[store].language[this.selectLang].infoPage;
                this.name = this.settings.webstore[store].language[this.selectLang].name;
                this.logo = this.settings.webstore[store].language[this.selectLang].logo;
            }
            else
            {
                this.infoPage = "0";
                this.logo = "0";
                this.name = "";
            }
        }
    }
}