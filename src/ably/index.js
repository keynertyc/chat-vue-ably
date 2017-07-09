/**
 * Created by Keyner on 7/7/17.
 */
import * as Ably from 'ably';

const client = new Ably.Realtime('<Set your key from ably.io>');

export { client as default };
