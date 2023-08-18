document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".form-check-input").forEach(async check => {
		check.checked = (await chrome.storage.sync.get())[check.id];

		check.addEventListener("change", e => {
			chrome.storage.sync.set({ [e.target.id]: e.target.checked });

			chrome.tabs.query({ url: [ "https://*.google.com/*", "https://*.google/*" ] }, tabs => {
				tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, "nocturnalUpdate"));
			});
		});
	});
});