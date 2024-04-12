sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    function (Controller) {
        "use strict"

        return Controller.extend("ui5.sapui5demo.controller.App", {
            onOpenDialog: function(){
                this.getOwnerComponent().openHelloDialog();
            }

        })
    }
)