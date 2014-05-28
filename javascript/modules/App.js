var widgetAPI = typeof Common === 'undefined' ? { sendReadyEvent: function () { } } : new Common.API.Widget();
var tvKey = typeof Common === 'undefined' ? { sendReadyEvent: function () { } } : new Common.API.TVKeyValue();

var Application = window.Application = {
	onLoad: function() {
		widgetAPI.sendReadyEvent();

		alert('Application Ready');
	},
	onUnload: function() {
		alert('Application Shutdown');
	},
	onKeyPress: function() {

		var keyCode = event.keyCode;
		alert("Key pressed: " + keyCode);

		switch(keyCode) {
			default:
				alert("Unhandled key");
				break;
		}
	}
};