import browser from 'webextension-polyfill';
import type { MsgRequest } from '../lib/model';

export async function sendMessageRequest(msg: MsgRequest) {
	await browser.runtime.sendMessage(msg);
}