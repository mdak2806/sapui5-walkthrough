// Define a module named "App" using sap.ui.define
sap.ui.define([
    "sap/ui/core/mvc/Controller", // Import necessary module
],
function (Controller) { // Define module function with Controller as a parameter
    "use strict"; // Enable strict mode

    // Return Controller.extend to define a new controller named "App"
    return Controller.extend("ui5.sapui5demo.controller.App", {
        // Define method to open a dialog
        onOpenDialog: function () {
            // Call the "openHelloDialog" method of the owner component
            // "getOwnerComponent" retrieves the component instance associated with this controller
            // "openHelloDialog" is a custom method defined in the owner component
            this.getOwnerComponent().openHelloDialog();
        }
    });
});
