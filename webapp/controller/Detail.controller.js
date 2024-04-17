sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent", 
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function(Controller, UIComponent, History, MessageToast){
    "use strict"

    return Controller.extend("ui5.sapui5demo.controller.Detail", {

        onInit: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjextMatched, this);
        },
        _onObjextMatched: function(oEvent){

            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            })

        }, 
        onNavBack: function(){
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if(sPreviousHash !== undefined){
                window.history.go(-1)
            } else{
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo('overview', {}, true)
            }
        }, 
        onRatingChange: function(oEvent){
            var fValue = oEvent.getParameter("value");
            var oResourceBundle= this.getView().getModel("i18n").getResourceBundle();

            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]))
        }
    })
})