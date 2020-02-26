import AppsterController from '../appster/AppsterController.js'
import { GoLogoLoGUIId, GoLogoLoCallback } from './GoLogoLoConstants.js';
import {AppsterHTML,AppsterGUIId} from '../appster/AppsterConstants.js'

export default class GoLogoLoController
    extends AppsterController {
    constructor() {
        super();
    }


   
    registerAppsterEventHandlers(){//register the edit text handlers
        super.registerAppsterEventHandlers()
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON,AppsterHTML.CLICK,this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_TEXT])
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_ENTER_BUTTON,AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_ENTER_BUTTON])
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_CANCEL_BUTTON,AppsterHTML.CLICK,this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_CANCEL_BUTTON]);
        
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER,AppsterHTML.CHANGE,this[GoLogoLoCallback.GOLOGOLO_PROCESS_FONT_SIZE_SLIDER]);//slider

    }   
    
    processEditText=()=> {//this should be the place where the modeal shows up
        console.log("edit text");
        
        this.model.view.showDialog(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL);//i am here!!!
        
    }
    processEditEnter=()=>{
        this.model.view.hideDialog(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL);
        let newText = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL_TEXTFIELD).value;
        if(newText=="")//empty?
            this.model.view.showDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL_EMPTY);
        else{
            this.model.updateText(this.model.getCurrentWork(),newText);
            
            this.model.view.loadWork(this.model.getCurrentWork());

        }

    }

    processEditCancel=()=>{
        this.model.view.hideDialog(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL);
    }

    processFontSlider=()=>{//slider
        console.log("FontSlider");
    }
}