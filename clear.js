require('dotenv').config()
const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const { Api } = require('telegram/tl');
const input = require('input')

const API_ID = Number(process.env.API_ID)
const API_HASH = process.env.API_HASH
const SEND_CHAT = process.env.SEND_CHAT
const STRING_SESSION = process.env.STRING_SESSION

const stringSession = new StringSession(STRING_SESSION);

(async () => {
    console.log('Loading interactive login...')
    const client = new TelegramClient(stringSession, API_ID, API_HASH, { connectionRetries: 5 })
    await client.start({
        phoneNumber: async () => await input.text('number ?'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
    console.log('You should now be connected.')
    console.log(client.session.save()) // Save this string in STRING_SESSION to avoid logging in again

    const scheduled = await client.invoke(
      new Api.messages.GetScheduledHistory({
        peer: SEND_CHAT,
        hash: 0,
      })
    )

    const ids = scheduled.messages.map(e => e.id)

    await client.invoke(
      new Api.messages.DeleteScheduledMessages({
        peer: SEND_CHAT,
        id: ids,
      })
    )

    await client.disconnect();
    await client.destroy();
})()
