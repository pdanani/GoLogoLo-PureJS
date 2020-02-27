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
        
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_FONT_SIZE_SLIDER]);//sliders and pickers
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_TEXT_COLOR_PICKER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_BACKGROUND_COLOR_PICKER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_COLOR_PICKER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_RADIUS_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_THICKNESS_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_PADDING_SLIDER]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER,AppsterHTML.INPUT,this[GoLogoLoCallback.GOLOGOLO_PROCESS_MARGIN_SLIDER]);


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
            
            this.model.view.loadWork(this.model.getCurrentWork()); //refresh the work page

        }

    }

    processEditCancel=()=>{
        this.model.view.hideDialog(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL);

    }

    processFontSlider=()=>{//slider

        console.log("FontSlider");

        let sliderValue=document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER).value;
        
        this.model.getCurrentWork().setFontSize(sliderValue);
        this.model.view.loadWork(this.model.getCurrentWork());

    }
    processTextColor=()=>{
        console.log("textcolor");

        let colorVal=document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER).value;
        this.model.getCurrentWork().setTextColor(colorVal);
        this.model.view.loadWork(this.model.getCurrentWork());


    }
    processBackgroundColor=()=>{

        let colorVal=document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER).value;
        this.model.getCurrentWork().setBackgroundColor(colorVal);
        this.model.view.loadWork(this.model.getCurrentWork());
    }
    processBorderColor=()=>{

        let colorVal=document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER).value;
        this.model.getCurrentWork().setBorderColor(colorVal);
        this.model.view.loadWork(this.model.getCurrentWork());
    }
    processBorderRadius=()=>{
        let sliderValue=document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER).value;
        this.model.getCurrentWork().setBorderRadius(sliderValue);
        this.model.view.loadWork(this.model.getCurrentWork());
    }
    processBorderThickness=()=>{
        let sliderValue=document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER).value;
        this.model.getCurrentWork().setBorderThickness(sliderValue);
        this.model.view.loadWork(this.model.getCurrentWork());
    }
    processPadding=()=>{
        let sliderValue=document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER).value;
        this.model.getCurrentWork().setPadding(sliderValue);
        this.model.view.loadWork(this.model.getCurrentWork());
    }
    processMargin=()=>{
        let sliderValue=document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER).value;
        this.model.getCurrentWork().setMargin(sliderValue);
        this.model.view.loadWork(this.model.getCurrentWork());
    }

}