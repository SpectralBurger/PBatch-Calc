// Listen for messages from popup
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.action === "clickCalculateButton") {
        const btn = document.querySelector('input[name="btnCalculate"]');
        const diamField = document.querySelector('input[name="inPDiameter"]')
        const pitchField = document.querySelector('input[name="inPPitch"]')
        const data = msg.data;
        

        const diamUpper = Number(data.diamUpper);
        const diamLower = Number(data.diamLower);
        const diamInterval = Number(data.diamInterval);
        const pitchUpper = Number(data.pitchUpper);
        const pitchLower = Number(data.pitchLower);
        const pitchInterval = Number(data.pitchInterval);

        var MFTVals = [];
        var StaticTVals = [];
        var TtoWVals = [];
        var PSpdVals = [];
        var LvlSpdVals = [];
        var EffDriveVals = [];
        var PowerVals = [];
        var MinFTimeVals = [];
        
        var Sizes = [];

        var MFT;
        var StaticT;
        var TtoW;
        var PSpd;
        var LvlSpd;
        var EffDrive;
        var Power;
        var MinFTime;

        if (btn) {
            for (let i1 = diamLower; i1 <= diamUpper; i1+= diamInterval) {
                for (let i2 = pitchLower; i2 <= pitchUpper; i2+= pitchInterval) {
                    
                
                    diamField.value = i1;
                    pitchField.value = i2;
                    
                    Sizes.push(String(i1) + " x " + String(i2));

                    btn.click();
                    await new Promise(r => setTimeout(r, 600));

                    MFT = Number(document.querySelector("#outBMixedFlightTime")?.innerText || 0);
                    StaticT = Number(document.querySelector("#outPThrust")?.innerText || 0);
                    TtoW = Number(document.querySelector("#outTotThrustWeight")?.innerText || 0);
                    PSpd = Number(document.querySelector("#outPPitchSpeedMph")?.innerText || 0);
                    LvlSpd = Number(document.querySelector("#outMLevelSpeedMph")?.innerText || 0);
                    EffDrive = Number(document.querySelector("#outTotEfficiency")?.innerText || 0);
                    Power = Number(document.querySelector("#outMaxWin")?.innerText || 0);
                    MinFTime = Number(document.querySelector("#outBFlightTime")?.innerText || 0);

                    console.log(MFT);

                    // need MFT, static thrust, T/W, Pitch Spd, Est Lvl Spd, Eff Drive, Power, Min Flight Time
                    MFTVals.push(MFT);
                    StaticTVals.push(StaticT);
                    TtoWVals.push(TtoW);
                    PSpdVals.push(PSpd);
                    LvlSpdVals.push(LvlSpd);
                    EffDriveVals.push(EffDrive);
                    PowerVals.push(Power);
                    MinFTimeVals.push(MinFTime);
                    

                }
            }
            
        } else {
            console.log("Content script: calculate button or input fields NOT found");
        }
    }

    let Outdata = [];
    for (let i = 0; i < MFTVals.length; i++) {
        Outdata.push([
            Sizes[i],
            MFTVals[i],
            StaticTVals[i],
            TtoWVals[i],
            PSpdVals[i],
            LvlSpdVals[i],
            EffDriveVals[i],
            PowerVals[i],
            MinFTimeVals[i]
    ]);
    
}

    chrome.runtime.sendMessage({
        action: "fromContent",
        payload: {Outdata}
    });


});

