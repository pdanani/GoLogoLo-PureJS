import { AppsterCallback, AppsterGUIId, AppsterHTML } from './AppsterConstants.js'

export default class AppsterController {
    constructor() {
        this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        //Enter and canel buttons for create new work
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_ENTER_BUTTON])
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_BUTTON])
        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);
    
        //OK BUTTONS
        this.registerEventHandler(AppsterGUIId.APPSTER_CONFIRM_MODAL_OK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_OK_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_CONFIRM_MODAL_OK_BUTTON_EMPTY, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_OK_BUTTON_EMPTY]);

        
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit(workToEdit) {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork = () => {
        console.log("processCreateNewWork");

        // PROMPT FOR THE NAME OF THE NEW LIST
        this.model.view.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);

    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");

        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");

        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork = () => {
        // JUST HIDE THE DIALOG

        this.model.view.hideDialog(AppsterGUIId.APPSTER_YES_NO_MODAL);

    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork = () => {
        //remove the dialog box
        this.model.view.hideDialog(AppsterGUIId.APPSTER_YES_NO_MODAL);
        // DELETE THE WORK
        this.model.removeWork(this.model.getCurrentWork());//I think this has to be changed to .currentWork

        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }
    processEnterButton = () => { //if the enter button is hit, cross check if has been used before and then add it to the recent work list.

        this.model.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);

        //   this.model.goList(this.model.view.APPSTER_TEXT_INPUT_MODAL);
        let workString = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value;
        if(workString=="")
            this.model.view.showDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL_EMPTY);
        else if(this.model.getRecentWork(workString)!=null)
            this.model.view.showDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL);
        else{
            this.model.goList(workString);
        }
    }
    processCancelButton = () => {//cancels the creation of new work.
        this.model.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);


    }
    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork = () => {
        // VERIFY VIA A DIALOG BOX
        this.model.view.showDialog(AppsterGUIId.APPSTER_YES_NO_MODAL);
    }

    processOkButton=()=>{

        this.model.view.hideDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL);

    }
    processOkButtonEmpty=()=>{

        this.model.view.hideDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL_EMPTY);

    }

}