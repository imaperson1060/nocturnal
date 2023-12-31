setTheme();

chrome.runtime.onMessage.addListener(message => { if (message == "nocturnalUpdate") setTheme(); });

async function setTheme() {
	let nocturnal = (await chrome.storage.sync.get());

	switch (window.location.host.split(".")[0]) {
		case "classroom":
			if (nocturnal.classroom && !document.getElementById("nocturnal")) document.querySelector("head").appendChild(createLink("css/classroom.css"));
			else if (!nocturnal.classroom) document.getElementById("nocturnal")?.remove();
			break;
		case "domains":
			if (nocturnal.domains && !document.getElementById("nocturnal")) document.querySelector("head").appendChild(createLink("css/domains.css"));
			else if (!nocturnal.domains) document.getElementById("nocturnal")?.remove();
			break;
		case "ogs":
			if (nocturnal.ogs && !document.getElementById("nocturnal")) document.querySelector("head").appendChild(createLink("css/ogs.css"));
			else if (!nocturnal.ogs) document.getElementById("nocturnal")?.remove();
			break;
	}
}

function createLink(ref) {
	var link = document.createElement("link");
	link.id = "nocturnal";
	link.rel = "stylesheet";
	link.href = chrome.runtime.getURL(ref);
	return link;
}