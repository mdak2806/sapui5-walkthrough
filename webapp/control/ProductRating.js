// Define a custom control named "ProductRating" which extends sap.ui.core.Control
sap.ui.define([
    "sap/ui/core/Control", // Importing necessary modules
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
], function (Control, RatingIndicator, Label, Button) {
    "use strict";
    
    // Return the custom control definition
    return Control.extend("sap.ui.demo.walkthrough.control.ProductRating", {
        // Metadata definition for the control
        metadata: {
            properties: {
                value: { type: "float", defaultValue: 0 } // Define a property "value" of type float with default value 0
            },
            aggregations: {
                _rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" }, // Define an aggregation "_rating" of type sap.m.RatingIndicator
                _label: { type: "sap.m.Label", multiple: false, visibility: "hidden" }, // Define an aggregation "_label" of type sap.m.Label
                _button: { type: "sap.m.Button", multiple: false, visibility: "hidden" } // Define an aggregation "_button" of type sap.m.Button
            },
            events: {
                change: { // Define a custom event "change" with parameter "value" of type int
                    parameters: {
                        value: { type: "int" }
                    }
                }
            }
        },
        // Initialization function called when control is instantiated
        init: function () {
            // Create and set aggregations for rating, label, and button
            this.setAggregation("_rating", new RatingIndicator({
                value: this.getValue(),
                iconSize: "2rem",
                visualMode: "Half",
                liveChange: this._onRate.bind(this) // Event handler for live change of rating
            }));
            this.setAggregation("_label", new Label({
                text: "{i18n>productRatingLabelInitial}" // Set initial text for label from i18n resource bundle
            }).addStyleClass("sapUiSmallMargin"));
            this.setAggregation("_button", new Button({
                text: "{i18n>productRatingButton}", // Set button text from i18n resource bundle
                press: this._onSubmit.bind(this) // Event handler for button press
            }).addStyleClass("sapUiTinyMarginTopBottom"));
        },
        // Setter function for property "value"
        setValue: function (fValue) {
            this.setProperty("value", fValue, true); // Set property value and suppress invalidation
            this.getAggregation("_rating").setValue(fValue); // Update rating indicator value
        },
        // Reset function to reset control state
        reset: function () {
            var oResourceBundle = this.getModel("i18n").getResourceBundle(); // Get i18n resource bundle

            // Reset control state
            this.setValue(0);
            this.getAggregation("_label").setDesign("Standard");
            this.getAggregation("_rating").setEnabled(true);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
            this.getAggregation("_button").setEnabled(true);
        },
        // Event handler for rating change
        _onRate: function (oEvent) {
            var oResourceBundle = this.getModel("i18n").getResourceBundle(); // Get i18n resource bundle
            var fValue = oEvent.getParameter("value"); // Get new rating value

            this.setProperty("value", fValue, true); // Set property value and suppress invalidation

            // Update label text and design
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
            this.getAggregation("_label").setDesign("Bold");
        },
        // Event handler for submit button press
        _onSubmit: function (oEvent) {
            var oResourceBundle = this.getModel("i18n").getResourceBundle(); // Get i18n resource bundle

            // Disable rating and button, update label text
            this.getAggregation("_rating").setEnabled(false);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
            this.getAggregation("_button").setEnabled(false);
            
            // Fire custom "change" event with current value
            this.fireEvent("change", {
                value: this.getValue()
            });
        },
        // Renderer function to render control
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("myAppDemoWTProductRating");
            oRm.openEnd();
            oRm.renderControl(oControl.getAggregation("_rating")); // Render rating indicator
            oRm.renderControl(oControl.getAggregation("_label")); // Render label
            oRm.renderControl(oControl.getAggregation("_button")); // Render button
            oRm.close("div");
        }
    });
});
