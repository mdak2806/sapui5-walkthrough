// Define a module named "HelloPanel" using sap.ui.define
sap.ui.define([
    "sap/ui/core/mvc/Controller", // Import necessary modules
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function(Controller, MessageToast, Fragment){ // Define module function with required modules as parameters
    "use strict"; // Enable strict mode

    // Return Controller.extend to define a new controller named "HelloPanel"
    return Controller.extend("ui5.sapui5demo.controller.HelloPanel", {
        // Event handler for the "onShowHello" event
        onShowHello: function () {
            // Read message from i18n model
            const oBundle = this.getView().getModel("i18n").getResourceBundle(); // Get i18n resource bundle
            const sRecipient = this.getView().getModel().getProperty("/recipient/name"); // Get recipient's name from model
            const sMsg = oBundle.getText("helloMsg", [sRecipient]); // Construct message using i18n resource

            // Show message using MessageToast
            MessageToast.show(sMsg);
        },
        // Event handler for opening the dialog
        onOpenDialog: function(){
            this.getOwnerComponent().openHelloDialog(); // Call the "openHelloDialog" method of the owner component
        },
        // Event handler for closing the dialog
        onClosingDialog: function(){
            this.byId("helloDialog").close(); // Close the dialog
        }
    });
});
