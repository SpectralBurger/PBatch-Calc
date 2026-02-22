importScripts("browser-polyfill.js");
browser.runtime.onMessage.addListener((msg) => {
    if (msg.action === "fromContent") {
        console.log("Got data from content script!");

        browser.runtime.sendMessage({
            action: "contentData",
            payload: msg.payload
        });
    }
});
