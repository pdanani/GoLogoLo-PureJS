import AppsterController from '../appster/AppsterController.js'
import { GoLogoLoGUIId, GoLogoLoCallback } from './GoLogoLoConstants.js';
import {AppsterHTML} from '../appster/AppsterConstants.js'

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

    }
    
    processEditText=()=> {//this should be the place where the modeal shows up
        console.log("edit text");
        
        this.model.view.showDialog(GoLogoLoGUIId.GOLOGOLO_TEXT_INPUT_MODAL);//i am here!!!
        
       // this.model.updateText();
    }
}