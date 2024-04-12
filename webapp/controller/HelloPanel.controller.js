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
                var oView= this.getView();

                // Create the dialog lazily
                if(!this.byId("helloDialog")){
                    // load async xml fragment

                    Fragment.load({
                        id: oView.getId(),
                        name: "ui5.sapui5demo.view.HelloDialog",
                        controller: this
                    }).then(function(oDialog){
                        // connect the dialog to the root view of component
                        oView.addDependent(oDialog);
                        oDialog.open();

                    })
                } else{
                    this.byId('helloDialog').open();
                }
            },

            // function to close the popup
            onClosingDialog: function(){
                this.byId("helloDialog").close();
            }
        })
    }
)