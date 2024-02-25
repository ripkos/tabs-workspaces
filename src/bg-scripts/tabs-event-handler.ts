import browser from 'webextension-polyfill';

browser.tabs.onCreated.addListener(async (x) => {});

browser.tabs.onAttached.addListener(async (x, i) => {});

//browser.tabs.onDetached.addListener(async (x, i)=>{});

browser.tabs.onRemoved.addListener(async (x, i) => {});
