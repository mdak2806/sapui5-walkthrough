sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function(ManagedObject, Fragment){

    "use strict"

    return ManagedObject.extend("ui5.sapui5demo.controller.HelloDialog", {
        constructor: function(oView){
            this._oView = oView;
        },

        exit: function(){
            delete this._oView
        },

        open: function(){
            var oView= this._oView;

            // create the dialog lazilly
            if(!oView.byId("helloDialog")){
                var oFragementController = {
                    onCloseDialog: function(){
                        oView.byId("helloDialog").close()
                    }
                }
            

            // load async xml fragement

            Fragement.load({
                id: oView.getId(),
                name: "ui5.sapui5demo.view.HelloDialog",
                controller: oFragementController

            }).then(function(oDialog){
                // connect the dialog to the root view of this particular compoenent
                oView.addDependent(oDialog);
                oDialog.open();

            })
        } else{
           oView.byId("helloDialog").open() 
        }
        
        }
    })
})