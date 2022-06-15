const PanelMain = {
	init:function() {
		$("#panel-main-btn-1").click(function() {
			PanelEditor.createNew();
			PanelMain.exit();
			PanelEditor.enter();
		});
		$("#panel-main-btn-2").click(function() {
			PanelMain.exit();
			PanelSelect.enter();
		});
	},
	enter: function() {
		$("#panel-main").css("display", "");
	},
	exit: function() {
		$("#panel-main").css("display", "none");
	}
};
PanelMain.init();
