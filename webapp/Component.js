sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"

 ], (UIComponent, JSONModel) => {
    "use strict";
 
    return UIComponent.extend("ui5.sapui5demo.Component", {
       metadata : {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        mainfest: "json"
       },
 
       init() {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
          // set data model
          const oData = {
             recipient : {
                name : "World"
             }
          };
          const oModel = new JSONModel(oData);
          this.setModel(oModel);
 
          // set i18n model
        //   const i18nModel = new ResourceModel({
        //      bundleName: "ui5.sapui5demo.i18n.i18n"
        //   });
        //   this.setModel(i18nModel, "i18n");
       }
    });
 });
 