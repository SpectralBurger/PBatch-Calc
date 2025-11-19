chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "fromContent") {
        console.log("Got data from content script!");

        chrome.runtime.sendMessage({
            action: "contentData",
            payload: msg.payload
        });
    }
});