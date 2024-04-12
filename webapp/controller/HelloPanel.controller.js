sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], 
    function(Controller, MessageToast, Fragment){
        "use strict"
        
        return Controller.extend("ui5.sapui5demo.controller.HelloPanel", {
            // now add logic for the event
            onShowHello: function () {
                // read msg from i18n model
                const oBundle = this.getView().getModel("i18n").getResourceBundle();
                const sRecipient = this.getView().getModel().getProperty("/recipient/name");
                const sMsg = oBundle.getText("helloMsg", [sRecipient]);

                // show message
                MessageToast.show(sMsg);



            },

            onOpenDialog: function(){
              this.getOwnerCompeont().openHelloDialog();
            },

            // function to close the popup
            onClosingDialog: function(){
                this.byId("helloDialog").close();
            }
        })
    }
)