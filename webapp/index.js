sap.ui.define([
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		name: "sapui5demo",
		settings : {
			id : "sapui5demo"
		},
		async: true
	}).placeAt("content");
});