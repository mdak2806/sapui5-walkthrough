// Define a module named "Detail" using sap.ui.define
sap.ui.define([
    "sap/ui/core/mvc/Controller", // Import necessary modules
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function(Controller, UIComponent, History, MessageToast){ // Define module function with required modules as parameters
    "use strict"; // Enable strict mode

    // Return Controller.extend to define a new controller named "Detail"
    return Controller.extend("ui5.sapui5demo.controller.Detail", {
        // Initialization function called when the controller is instantiated
        onInit: function(){
            // Get the router associated with the UI component
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Attach a callback function to the "detail" route's "patternMatched" event
            // This function will be called when the route is matched
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        // Function called when the "detail" route's pattern is matched
        _onObjectMatched: function(oEvent){
            // Bind the view to the element specified in the route's arguments
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath), // Extract path from route parameters
                model: "invoice" // Use "invoice" model for binding
            });
        },
        // Function called when the "NavBack" button is pressed
        onNavBack: function(){
            // Get the history instance
            var oHistory = History.getInstance();
            // Retrieve the previous hash from the history
            var sPreviousHash = oHistory.getPreviousHash();

            // If there is a previous hash, navigate back in history
            if(sPreviousHash !== undefined){
                window.history.go(-1);
            } else { // If no previous hash, navigate to the "overview" route
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo('overview', {}, true);
            }
        },
        // Function called when the rating is changed
        onRatingChange: function(oEvent){
            // Get the new rating value
            var fValue = oEvent.getParameter("value");
            // Get the resource bundle for internationalization
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            // Show a message toast confirming the new rating value
            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
        }
    });
});
