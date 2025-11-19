const runBatchButton = document.querySelector("#runBatch");
const exportCSVButton = document.querySelector("#export");
// need MFT, static thrust, T/W, Pitch Spd, Est Lvl Spd, Eff Drive, Power, Min Flight Time. If other values are needed, add to payload in content.js .
const headers = ["Mixed Flight Time", "Static Thrust", "T/W", "Pitch Speed", "Estimated Level Speed", "Efficiency Drive (%)", "Power", "Min Flight Time"]
let receivedData = null

function arrayToCSV(data) {
  return data
    .map(row =>
      row
        .map(cell => {
          if (cell === null || cell === undefined) return '""';
          return `"${String(cell).replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");
}

runBatchButton.addEventListener("click", async () => {
    console.log("Popup: run batch pressed");
    runBatchButton.textContent = "Working...";
    runBatchButton.disabled = true;
    const diamUpper = document.querySelector("#diamUpper");
    const diamLower = document.querySelector("#diamLower");
    const diamInterval = document.querySelector("#diamInterval");
    const pitchUpper = document.querySelector("#pitchUpper");
    const pitchLower = document.querySelector("#pitchLower");
    const pitchInterval = document.querySelector("#pitchInterval");
    // Find the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message to content script
    chrome.tabs.sendMessage(tab.id, { 
        action: "clickCalculateButton",
        data: {
            diamUpper: diamUpper.value,
            diamLower: diamLower.value,
            diamInterval: diamInterval.value,
            pitchUpper: pitchUpper.value,
            pitchLower: pitchLower.value,
            pitchInterval: pitchInterval.value,
    }   });
    
    
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "contentData") {

        console.log("Popup received!");
        receivedData = msg.payload
        runBatchButton.disabled = false;
        runBatchButton.textContent = "Run Batch";
    }
});

exportCSVButton.addEventListener("click", async () => {

    if (!receivedData) {
        console.error("No data received yet!");
        return;
    }
    const dataWithHeaders = [headers, ...receivedData.Outdata];
    const csvContent = arrayToCSV(dataWithHeaders);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();

    URL.revokeObjectURL(url);

})
