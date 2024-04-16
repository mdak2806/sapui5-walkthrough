// Define a module using sap.ui.define, which is a common way to define modules in SAPUI5
sap.ui.define([
    "sap/ui/test/Opa5", // Import Opa5 module for test automation
    "sap/ui/test/actions/Press" // Import Press action module for simulating user actions
], function(Opa5, Press){
    "use strict";

    // Define the name of the view to be tested
    var sViewName = "sap.ui.demo.sapui5demo.view.HelloPanel";

    // Create OPA page objects for the application page
    Opa5.createPageObjects({
        onTheAppPage:{
            actions: {
                // Define an action to simulate pressing the 'Say Hello with Dialog' button
                iPressTheSayHelloWithDialogButton: function(){
                    // Wait for the 'helloDialogButton' control to appear on the view and then press it
                    return this.waitFor({
                        id: "helloDialogButton", // ID of the control to interact with
                        viewName: sViewName, // Name of the view where the control is located
                        actions: new Press(), // Perform a press action on the control
                        errorMessage: "Did not find the 'Say Hello with Dialog' button on the Hello Panel page" // Error message if control is not found
                    });
                }
            },

            assertions: {
                // Define an assertion to check if the hello dialog is open
                iShouldSeeTheHelloDialog: function(){
                    // Wait for a sap.m.Dialog control to appear
                    return this.waitFor({
                        controlType: "sap.m.Dialog", // Type of control to wait for
                        success: function(){
                            // If a Dialog control is found, assert that the dialog is open
                            Opa5.assert.ok(true, "the dialog is open")
                        }, 
                        errorMessage: "Did not find the dialog control" // Error message if Dialog control is not found
                    })
                }
            }
        }
    })
})
