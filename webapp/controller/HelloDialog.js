// Define a module named "HelloDialog" using sap.ui.define
sap.ui.define([
    "sap/ui/base/ManagedObject", // Import necessary modules
    "sap/ui/core/Fragment"
], function(ManagedObject, Fragment){ // Define module function with required modules as parameters
    "use strict"; // Enable strict mode

    // Return ManagedObject.extend to define a new managed object named "HelloDialog"
    return ManagedObject.extend("ui5.sapui5demo.controller.HelloDialog", {
        // Constructor function to initialize the managed object with a view
        constructor: function(oView){
            this._oView = oView; // Store the view reference
        },
        // Exit function to clean up resources when the managed object is destroyed
        exit: function(){
            delete this._oView; // Delete the view reference
        },
        // Open function to open the dialog
        open: function(){
            var oView = this._oView; // Get the view reference
            
            // Create the dialog lazily if not already created
            if(!oView.byId("helloDialog")){
                var oFragmentController = {
                    onCloseDialog: function(){ // Function to close the dialog
                        oView.byId("helloDialog").close();
                    }
                };
            
                // Load the XML fragment asynchronously
                Fragment.load({
                    id: oView.getId(),
                    name: "ui5.sapui5demo.view.HelloDialog", // Fragment name
                    controller: oFragmentController // Fragment controller
                }).then(function(oDialog){ // Callback function when fragment is loaded
                    // Connect the dialog to the root view of this particular component
                    oView.addDependent(oDialog);
                    oDialog.open(); // Open the dialog
                });
            } else {
                oView.byId("helloDialog").open(); // If dialog already exists, just open it
            }
        }
    });
});
