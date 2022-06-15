const PanelSelect = {
	init: function() {
		$("#panel-select-btn-1").click(function() {
			PanelSelect.exit();
			PanelMain.enter();
		});
		$("#panel-select-btn-2").click(function() {
			let el = $("#panel-select-in-1")[0];
			if (el.files.length == 0) {
				$("#panel-select-text-1").text("Please select a file");
				return;
			}
			PageWait.show();
			const reader = new FileReader();
			reader.onload = function() {
				if (!PanelEditor.open(reader.result)) {
					PageWait.hide();
					$("#panel-select-text-1").text("Invalid log file, maybe it's broken");
					return;
				}
				PageWait.hide();
				PanelSelect.exit();
				PanelEditor.enter();
			};
			reader.readAsText(el.files[0]);
		});
	},
	enter: function() {
		$("#panel-select-text-1").empty();
		$("#panel-select-box-1")
			.empty()
			.prepend('<input id="panel-select-in-1" type="file" accept="application/json">');
		$("#panel-select").css("display", "");
	},
	exit: function() {
		$("#panel-select").css("display", "none");
	}
};
PanelSelect.init();
