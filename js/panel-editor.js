const PanelEditor = {
	data: null,
	init: function() {
		$("#panel-editor-btn-1").click(function() {
			let c = $("#panel-editor-character").val().trim();
			let t = $("#panel-editor-dialog").val().trim();
			if (c == "" || t == "") {
				alert("Character & dialog CANNOT be empty");
				return;
			}
			PanelEditor.append(c, t);
			$("#panel-editor-dialog").val("");
		});
		$("#panel-editor-btn-2").click(function() {
			PanelEditor.exit();
			PanelMain.enter();
		});
		$("#panel-editor-btn-3").click(function() {
			PanelEditor.save();
		});
	},
	enter: function() {
		PanelEditor.render();
		$("#panel-editor-character").val("");
		$("#panel-editor-dialog").val("");
		$("#panel-editor").css("display", "flex");
		$("#panel-editor-part-1").scrollTop($("#panel-editor-part-1")[0].scrollHeight);
		window.onbeforeunload = function() {
			return "Ensure you've saved before quit.";
		};
	},
	exit: function() {
		if (confirm("Save?"))
			PanelEditor.save();
		$("#panel-editor").css("display", "none");
		window.onbeforeunload = null;
	},
	createNew: function() {
		PanelEditor.data = {"title":"New","time":Date.now(),"log":[]};
	},
	open: function(str) {
		try {
			PanelEditor.data = JSON.parse(str);
			if (typeof PanelEditor.data.title != "string")
				throw "";
			if (typeof PanelEditor.data.time != "number")
				throw "";
			if (!(PanelEditor.data.log instanceof Array))
				throw "";
			for (let i = 0; i < PanelEditor.data.log.length; ++i) {
				if (typeof PanelEditor.data.log[i].character != "string")
					throw "";
				if (typeof PanelEditor.data.log[i].text != "string")
					throw "";
			}
		}
		catch {
			return false;
		}
		return true;
	},
	render: function() {
		$("#panel-editor-title").val(PanelEditor.data.title);
		let d = new Date(PanelEditor.data.time);
		$("#panel-editor-time").text("Saved at " + d.toLocaleString());
		$("#panel-editor-part-1").empty();
		for (let i = 0; i < PanelEditor.data.log.length; ++i) {
			let str = '<div class="panel-editor-log"><div class="panel-editor-log-del">x</div><div class="panel-editor-log-character">';
			str += PanelEditor.data.log[i].character;
			str += '</div><div class="panel-editor-log-text">';
			str += PanelEditor.data.log[i].text;
			str += '</div><div class="panel-footer">#';
			str += i;
			str += '</div></div>';
			$("#panel-editor-part-1").append(str);
		}
		$(".panel-editor-log")
			.mouseenter(function() {
				$(this).children(".panel-editor-log-del").show();
			})
			.mouseleave(function() {
				$(this).children(".panel-editor-log-del").hide();
			});
		$(".panel-editor-log-del").click(function() {
			let id = $(this).parent().children(".panel-footer").text();
			id = id.substr(1);
			if (confirm("Sure to delete dialog #" + id + '?')) {
				PanelEditor.data.log.splice(id, 1);
				PanelEditor.render();
			}
		});
	},
	save: function() {
		// Update title
		let title = $("#panel-editor-title").val().trim();
		if (title == "") {
			alert("Title CANNOT be empty");
			return;
		}
		PanelEditor.data.title = title;
		// Update time
		PanelEditor.data.time = Date.now();
		let tmp = new Date(PanelEditor.data.time);
		$("#panel-editor-time").text("Saved at " + tmp.toLocaleString());
		// Download
		let d = JSON.stringify(PanelEditor.data);
		let el = document.createElement("a");
		let b = new Blob([d], {type:"application/json"});
		el.href = URL.createObjectURL(b);
		el.download = PanelEditor.data.title + ".json";
		el.click();
	},
	append: function(c, t) {
		let str = '<div class="panel-editor-log"><div class="panel-editor-log-del">x</div><div class="panel-editor-log-character">';
		str += c;
		str += '</div><div class="panel-editor-log-text">';
		str += t;
		str += '</div><div class="panel-footer">#';
		str += PanelEditor.data.log.length;
		str += '</div></div>';
		PanelEditor.data.log.push({"character":c,"text":t});
		$("#panel-editor-part-1")
			.append(str)
			.scrollTop($("#panel-editor-part-1")[0].scrollHeight);
		$(".panel-editor-log")
			.last()
			.mouseenter(function() {
				$(this).children(".panel-editor-log-del").show();
			})
			.mouseleave(function() {
				$(this).children(".panel-editor-log-del").hide();
			});
		$(".panel-editor-log-del")
			.last()
			.click(function() {
				let id = $(this).parent().children(".panel-footer").text();
				id = id.substr(1);
				if (confirm("Sure to delete dialog #" + id + '?')) {
					PanelEditor.data.log.splice(id, 1);
					PanelEditor.render();
				}
			});
	}
};
PanelEditor.init();
