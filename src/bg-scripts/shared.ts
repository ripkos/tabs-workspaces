import browser from 'webextension-polyfill';
import type { MsgResponse } from '../lib/model';

export async function sendMessageResponse(msg: MsgResponse) {
	await browser.runtime.sendMessage(msg);
}
