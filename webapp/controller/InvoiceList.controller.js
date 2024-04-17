// Define a module named "InvoiceList" using sap.ui.define
sap.ui.define([
    "sap/ui/core/mvc/Controller", // Import necessary modules
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, formatter, Filter, FilterOperator){ // Define module function with required modules as parameters
    "use strict"; // Enable strict mode

    // Return Controller.extend to define a new controller named "InvoiceList"
    return Controller.extend("ui5.sapui5demo.controller.InvoiceList", {
        // Make formatter available in the controller
        formatter: formatter,
        
        // Initialization function called when the controller is instantiated
        onInit: function(){
            // Create a JSON model for view-specific data
            var oViewModel = new JSONModel({
                currency: "EURO" // Set default currency
            });

            // Set the JSON model to the view with name "view"
            this.getView().setModel(oViewModel, "view");
        },

        // Event handler for filtering invoices
        onFilterInvoices: function(oEvent){
            // Build the filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if(sQuery){
                // Add filter for ProductName containing the query string
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }
            // Get the list control and its binding
            var oList = this.byId("invoiceList");
            var oBinding = oList.getBinding("items");
            // Apply the filter to the binding
            oBinding.filter(aFilter);
        }, 

        // Event handler for pressing an invoice item
        onPress: function(oEvent){
            // Get the pressed item
            var oItem = oEvent.getSource();
            // Get the router associated with this component
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Navigate to the detail view with the selected invoice path
            oRouter.navTo("detail", {
                // Encode the selected invoice path and pass it as a parameter
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
        }
    });
});
