// Blocage réel des domaines dangereux
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [{
            "id": 1,
            "priority": 1,
            "action": { "type": "block" },
            "condition": { "urlFilter": "doubleclick.net", "resourceTypes": ["main_frame", "script"] }
        }],
        removeRuleIds: [1]
    });
    console.log("Bouclier ROOT-DEFENDER opérationnel.");
});