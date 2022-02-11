require('dotenv').config()
const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const { Api } = require('telegram/tl');
const moment = require('moment')
const input = require('input')
const calendar = require('./calendar.json')

const API_ID = Number(process.env.API_ID)
const API_HASH = process.env.API_HASH
const SEND_MESSAGE = process.env.SEND_MESSAGE
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

    for (let i = 0; i < calendar.length; i += 1) {
      await client.invoke(
        new Api.messages.SendMessage({
          peer: SEND_CHAT,
          message: SEND_MESSAGE,
          scheduleDate: moment(calendar[i]).unix(),
        })
      );
      console.log(`[Message scheduled] ${calendar[i]}`)
    }

    await client.disconnect();
    await client.destroy();
})()
