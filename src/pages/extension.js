import React, { useState } from 'react';

function Extension() {
    /*global chrome*/
    const [testStarted, setTestStarted] = useState(false);

    const startTest = () => {
        chrome.windows.update({ state: "fullscreen" });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: "http://localhost:3000/ext" });
        });
        setTestStarted(true);
    }
    console.log(testStarted)
    const endTest = () => {
        chrome.windows.update({ state: "normal" });
        setTestStarted(false);
    }

    if (testStarted) {
        chrome.webNavigation.onCompleted.addListener(function (details) {
        if (details.url !== "http://localhost:3000/ext") {
            alert("You are not allowed to navigate away from the test page!");
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: "http://localhost:3000/ext" });
            });
        }
        });
        chrome.tabs.onActivated.addListener(function (activeInfo) {
        alert("You are not allowed to switch tabs during the test!");
        });
        chrome.tabs.onCreated.addListener(function (tab) {
        alert("You are not allowed to open new tabs during the test!");
        chrome.tabs.remove(tab.id);
        });
        chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        if (removeInfo.isWindowClosing) return;
        alert("You are not allowed to close the tab during the test. Please click on the 'End Test' button to end the test.");
        });
    }

    return (
        <div>
        {testStarted ?
            <button color='red' onClick={endTest}>End Test</button> :
            <button color='red' onClick={startTest}>Start Test</button>}
        </div>
    )
}
  export default Extension
