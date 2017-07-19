import {
    Component,
    OnInit,
    forwardRef,
    Inject,
    Input
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '@plentymarkets/terra-components';
import {
    LocaleService,
    LocalizationService,
    Locale
} from 'angular2localization';
import { PayPalUiComponent } from '../../../paypal-ui.component';
import { SettingsService } from '../../service/settings.service';
import set = Reflect.set;

@Component({
               selector: 'setting-view',
               template: require('./setting-view.component.html'),
               styles:   [require('./setting-view.component.scss')]
           })
export class SettingViewComponent extends Locale implements OnInit
{
    private service:SettingsService;
    private settings;

    private selectLang = 'de';
    private webstore;
    private name;
    private logo;
    private infoPage;
    private description;
    private markup;

    private payPalMode:string;

    private isLoading:boolean = true;
    private languageValues:Array<TerraSelectBoxValueInterface>;
    private infoPageValues:Array<TerraSelectBoxValueInterface>;
    private logoValues:Array<TerraSelectBoxValueInterface>;

    //********************
    private _selectedAccount;
    private _accountListValues:Array<TerraSelectBoxValueInterface> = [];

    private _selectedPriority;
    private _priorityListValues:Array<TerraSelectBoxValueInterface> = [];

    private _payPalPlus:boolean;
    private _payPalInstallment:boolean;

    private _displayNameValue:string;

    private _selectedShippingCountry;
    private _shippingCountryListValues:Array<TerraSelectBoxValueInterface> = [];


    @Input() parameter:any;

    constructor(private settingsService:SettingsService,
                @Inject(forwardRef(() => PayPalUiComponent)) private payPalUiComponent:PayPalUiComponent,
                locale:LocaleService,
                localization:LocalizationService)
    {
        super(locale, localization);

        this.service = settingsService;

        this.settings =
            {
                webstore: []
            };

        this.markup = {
            webstore:  {
                flatDomestic:       0,
                flatForeign:        0,
                percentageDomestic: 0,
                percentageForeign:  0,
            },
            statistic: {
                flatDomestic:       0,
                flatForeign:        0,
                percentageDomestic: 0,
                percentageForeign:  0,
            }
        };

        this.languageValues = [
            {
                value:   'de',
                caption: this.localization.translate('german'),
            },
            {
                value:   'en',
                caption: this.localization.translate('english')
            },
            {
                value:   'fr',
                caption: this.localization.translate('french')
            },
            {
                value:   'es',
                caption: this.localization.translate('spanish')
            }
        ];

        this.infoPageValues = [
            {
                value:   '0',
                caption: '---'
            },
            {
                value:   '1',
                caption: this.localization.translate('internalInfoPage')
            },
            {
                value:   '2',
                caption: this.localization.translate('externalInfoPage')
            }
        ];

        this.description = '';

        this.logoValues = [
            {
                value:   '0',
                caption: this.localization.translate('showDefaultLogo')
            },
            {
                value:   '1',
                caption: this.localization.translate('showUploadedLogo')
            },
            {
                value:   '2',
                caption: this.localization.translate('donotShowLogo')
            }
        ];

        this._priorityListValues = [
            {
                value:   '1',
                caption: '',
                icon:    'icon-rating_small_1'
            },
            {
                value:   '2',
                caption: '',
                icon:    'icon-rating_small_02'
            },
            {
                value:   '3',
                caption: '',
                icon:    'icon-rating_small_3'
            },
            {
                value:   '4',
                caption: '',
                icon:    'icon-rating_small_4'
            },
            {
                value:   '5',
                caption: '',
                icon:    'icon-rating_small_5'
            }
        ];

        this._accountListValues = [
            {
                value:   '',
                caption: '---'
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
        if(this.parameter.settingsMode)
        {
            this.payPalMode = this.parameter.settingsMode
        }
        if(this.parameter.PID)
        {
            this.webstore = this.parameter.PID;
        }

        this.loadAccounts();
    }

    public loadAccounts()
    {
        this.payPalUiComponent.callLoadingEvent(true);

        this.service
            .getAccounts()
            .subscribe(response =>
                       {
                           let items = [];

                           for(let accountId in response)
                           {
                               if(response.hasOwnProperty(accountId))
                               {
                                   items.push({
                                       value:   accountId,
                                       caption: response[accountId].email
                                   });
                               }
                           }

                           this._accountListValues = items;

                           this.payPalUiComponent.callLoadingEvent(false);
                           this.payPalUiComponent.isLoading = false;
                           //this.isLoading = false;

                           this.loadShippingCountries();
                       },

                       error =>
                       {
                           this.payPalUiComponent.callLoadingEvent(false);
                           this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadAccounts') + ': ' + error.statusText, 'danger');
                           this.payPalUiComponent.isLoading = false;
                           this.isLoading = false;
                       });

    }

    public loadShippingCountries()
    {
        this.payPalUiComponent.callLoadingEvent(true);

        let value:Array<TerraSelectBoxValueInterface> = [];

        this.service
            .getShippingCountries()
            .subscribe(response =>
                       {
                           response.forEach((item) =>
                                            {
                                                if(item['active'] == 1)
                                                {
                                                    value.push({
                                                                   value:   item['id'],
                                                                   caption: item['name']
                                                               });
                                                }
                                            });

                           this._shippingCountryListValues = value;

                           this.payPalUiComponent.callLoadingEvent(false);
                           this.payPalUiComponent.isLoading = false;
                           //this.isLoading = false;

                           this.loadSettings();
                       },
                       error =>
                       {
                           this.payPalUiComponent.callLoadingEvent(false);
                           this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadShippingCountries') + ': ' + error.statusText, 'danger');
                           this.payPalUiComponent.isLoading = false;
                           this.isLoading = false;
                       }
            );
    }

    public loadSettings()
    {
        this.payPalUiComponent.callLoadingEvent(true);

        this.service
            .getSettings(this.payPalMode)
            .subscribe(
                response =>
                {
                    this.mapSettings(response);

                    this.payPalUiComponent.callLoadingEvent(false);
                    this.payPalUiComponent.isLoading = false;
                    this.isLoading = false;
                },

                error =>
                {
                    this.payPalUiComponent.callLoadingEvent(false);
                    this.payPalUiComponent.callStatusEvent(this.localization.translate('errorLoadSettings') + ': ' + error.statusText, 'danger');
                    this.payPalUiComponent.isLoading = false;
                    this.isLoading = false;
                }
            );
    }

    private mapSettings(response:any):void
    {
        if(typeof response !== 'undefined')
        {
            let settings = this.settings;

            for(let res in response)
            {
                for(let store in response[res])
                {
                    let PID = store.substr(4);
                    let aktStore = response[res][store];

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
                        for(let lang in aktStore.language)
                        {
                            this.checkLanguageExist(PID, lang);
                            settings.webstore[store].language[lang] = aktStore.language[lang];
                        }
                    }

                    if('account' in aktStore)
                    {
                        settings.webstore[store].account = aktStore.account;
                    }

                    if('payPalPlus' in aktStore)
                    {
                        settings.webstore[store].payPalPlus = aktStore.payPalPlus;
                    }

                    if('calcFinancing' in aktStore)
                    {
                        settings.webstore[store].calcFinancing = aktStore.calcFinancing;
                    }

                    if('description' in aktStore)
                    {
                      settings.webstore[store].description = aktStore.description;
                    }
                }
            }
        }

        this.setCurrentData(this.webstore, this.selectLang);
    }

    private checkWebstoreExist(webstore)
    {
        if(this.settings.webstore["PID_" + webstore] === undefined)
        {
            this.settings.webstore["PID_" + webstore] =
                {
                    language:          {},
                    markup:            {
                        webstore:  {
                            flatDomestic:       0,
                            flatForeign:        0,
                            percentageDomestic: 0,
                            percentageForeign:  0,
                        },
                        statistic: {
                            flatDomestic:       0,
                            flatForeign:        0,
                            percentageDomestic: 0,
                            percentageForeign:  0,
                        }
                    },
                    priority:          0,
                    shippingCountries: [],
                    account:           0,
                    payPalPlus:        0,
                    calcFinancing:     0,
                    description:       '',
                };
        }
    }

    private setCurrentData(webstore = null, lang = null)
    {
        if(webstore && lang)
        {
            this.webstore = webstore;
            this.selectLang = lang;
        }

        let store = "PID_" + this.webstore;

        if(store in this.settings.webstore)
        {
            this._selectedPriority = this.settings.webstore[store].priority;

            this.markup = {
                webstore:  {
                    flatDomestic:       this.settings.webstore[store].markup.webstore.flatDomestic,
                    flatForeign:        this.settings.webstore[store].markup.webstore.flatForeign,
                    percentageDomestic: this.settings.webstore[store].markup.webstore.percentageDomestic,
                    percentageForeign:  this.settings.webstore[store].markup.webstore.percentageForeign,
                },
                statistic: {
                    flatDomestic:       this.settings.webstore[store].markup.statistic.flatDomestic,
                    flatForeign:        this.settings.webstore[store].markup.statistic.flatForeign,
                    percentageDomestic: this.settings.webstore[store].markup.statistic.percentageDomestic,
                    percentageForeign:  this.settings.webstore[store].markup.statistic.percentageForeign,
                }
            };

            this._selectedShippingCountry = this.settings.webstore[store].shippingCountries;

            if(this.selectLang in this.settings.webstore[store].language)
            {
                this.infoPage = this.settings.webstore[store].language[this.selectLang].infoPage;
                this._displayNameValue = this.settings.webstore[store].language[this.selectLang].name;
                this.logo = this.settings.webstore[store].language[this.selectLang].logo;
                this.logo = this.settings.webstore[store].language[this.selectLang].description;
            }
            else
            {
                this.infoPage = "0";
                this.logo = "0";
                this._displayNameValue = "";
                this.description = '';
            }

            this._selectedAccount = this.settings.webstore[store].account;

            if(this.settings.webstore[store].payPalPlus == 1)
            {
                this._payPalPlus = true;
            }
            else
            {
                this._payPalPlus = false;
            }

            if(this.settings.webstore[store].calcFinancing == 1)
            {
                this._payPalInstallment = true;
            }
            else
            {
                this._payPalInstallment = false;
            }
        }
    }

    private saveSettings():void
    {
        this.isLoading = true;
        this.payPalUiComponent.callLoadingEvent(true);

        this.setGeneralData();
        this.setLanguageData();
        this.setMarkupData();

        let webstores = [];

        for(let store in this.settings.webstore)
        {
            webstores.push({
                               [store]: this.settings.webstore[store]
                           });
        }

        let data = {
            PayPalMode: this.payPalMode,
            settings:   webstores
        };

        this.service.saveSettings(data).subscribe(
            response =>
            {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('successSaveSettings'), 'success');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            },

            error =>
            {
                this.payPalUiComponent.callStatusEvent(this.localization.translate('errorSaveSettings') + ': ' + error.statusText, 'danger');
                this.payPalUiComponent.callLoadingEvent(false);
                this.isLoading = false;
            }
        );
    }

    private resetSettings():void
    {
        this._selectedPriority = 1;
        this._payPalPlus = false;
        this._payPalInstallment = false;
        this._displayNameValue = "";
        this._selectedShippingCountry = [];

        this.markup = {
            webstore:  {
                flatDomestic:       0,
                flatForeign:        0,
                percentageDomestic: 0,
                percentageForeign:  0,
            },
            statistic: {
                flatDomestic:       0,
                flatForeign:        0,
                percentageDomestic: 0,
                percentageForeign:  0,
            }
        };
    }

    private getSelectedShippingCountries():Array<any>
    {
        let shippingCountryList = [];

        this._shippingCountryListValues.forEach((country) =>
                                                {
                                                    //if(country.active === true)
                                                    //{
                                                    //    shippingCountryList.push(country.value);
                                                    //}
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

    private checkLanguageExist(webstore, language)
    {
        this.checkWebstoreExist(webstore);

        if(this.settings.webstore["PID_" + webstore.toString()].language[language] === undefined)
        {
            this.settings.webstore["PID_" + webstore].language[language] =
                {
                    name:     '',
                    logo:     '',
                    infoPage: ''
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
        this.settings.webstore["PID_" + this.webstore].priority = this._selectedPriority;
        this.settings.webstore["PID_" + this.webstore].shippingCountries = this._selectedShippingCountry;
        this.settings.webstore["PID_" + this.webstore].account = this._selectedAccount;

        if(this._payPalPlus == true)
        {
            this.settings.webstore["PID_" + this.webstore].payPalPlus = 1;
        }
        else
        {
            this.settings.webstore["PID_" + this.webstore].payPalPlus = 0;
        }

        if(this._payPalInstallment == true)
        {
            this.settings.webstore["PID_" + this.webstore].calcFinancing = 1;
        }
        else
        {
            this.settings.webstore["PID_" + this.webstore].calcFinancing = 0;
        }
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
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].name = this._displayNameValue;
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].logo = this.logo;
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].infoPage = this.infoPage;
        this.settings.webstore["PID_" + this.webstore].language[this.selectLang].description = this.description;
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


}
