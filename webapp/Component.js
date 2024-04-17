// Define a UIComponent with required modules
sap.ui.define([
   "sap/ui/core/UIComponent", // Import UIComponent module
   "sap/ui/model/json/JSONModel", // Import JSONModel module
   "sap/ui/model/resource/ResourceModel", // Import ResourceModel module
   "./controller/HelloDialog" // Import custom HelloDialog controller
], (UIComponent, JSONModel, ResourceModel, HelloDialog) => {
   "use strict";

   // Extend UIComponent to create a new component
   return UIComponent.extend("ui5.sapui5demo.Component", {
      // Metadata for the component
      metadata: {
         interfaces: ["sap.ui.core.IAsyncContentCreation"], // Implement IAsyncContentCreation interface
         mainfest: "json" // Define the manifest file for the component
      },

      // Initialization function
      init() {
         // Call the init function of the parent UIComponent
         UIComponent.prototype.init.apply(this, arguments);

         // Set data model
         const oData = {
            recipient: {
               name: "World"
            }
         };
         const oModel = new JSONModel(oData); // Create a new JSONModel with the data
         this.setModel(oModel); // Set the model for the component

         // Set i18n model (commented out for now)
         // const i18nModel = new ResourceModel({
         //     bundleName: "ui5.sapui5demo.i18n.i18n"
         // });
         // this.setModel(i18nModel, "i18n");

         // Set up dialog
         this._helloDialog = new HelloDialog(this.getRootControl()); // Instantiate the custom HelloDialog controller

         // Create the views based on the URL/hash
         this.getRouter().initialize(); // Initialize the router for navigation
      },

      // Exit method
      exit: function () {
         this._helloDialog.destroy(); // Destroy the HelloDialog instance
         delete this._helloDialog; // Remove the reference to the HelloDialog instance
      },

      // Open dialog function
      openHelloDialog: function () {
         this._helloDialog.open(); // Call the open method of the HelloDialog instance to open the dialog
      }
   });
});
