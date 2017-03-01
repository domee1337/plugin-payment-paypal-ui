import { Injectable } from '@angular/core';
import {
    TerraSplitViewInterface,
} from "@plentymarkets/terra-components";

@Injectable()
export class SplitViewService
{
    
    private _modules:Array<TerraSplitViewInterface> = [];
    
    public get modules():Array<TerraSplitViewInterface>
    {
        return this._modules;
    }
    
    public set modules(value:Array<TerraSplitViewInterface>)
    {
        this._modules = value;
    }
    
    
    private _settingMode:string;
    
    public get settingMode():string
    {
        return this._settingMode;
    }
    
    public set settingMode(value:string)
    {
        this._settingMode = value;
    }
    
    constructor()
    {
        
    }
    
    public addModule(module:TerraSplitViewInterface):void
    {
        if(this._modules.length > 1)
        {
            this._modules.pop();
        }
        
        this._modules.push(module);
    }
    
}