require('dotenv').config()
const moment = require('moment')

const GENERATE_CALENDAR_HOUR_ENTER = Number(process.env.GENERATE_CALENDAR_HOUR_ENTER)
const GENERATE_CALENDAR_HOUR_EXIT = Number(process.env.GENERATE_CALENDAR_HOUR_EXIT)
const GENERATE_CALENDAR_FROM = process.env.GENERATE_CALENDAR_FROM
const GENERATE_CALENDAR_TO = process.env.GENERATE_CALENDAR_TO

// toDoubleDigits
const toDoubleDigits = (x) => x < 10 ? `0${x}` : `${x}`;

const getRandomMinute = () => Math.floor(Math.random() * 10);


const SAVE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const momentTo = moment(`${GENERATE_CALENDAR_TO} ${toDoubleDigits(GENERATE_CALENDAR_HOUR_ENTER)}:00:00`);
const lastYear = momentTo.year();
const lastMonth = momentTo.month();
const lastDay = momentTo.date();

const now = moment(GENERATE_CALENDAR_FROM)

const days = [];

while (true) {
  const weekday = now.weekday();
  if (weekday !== 0 && weekday !== 6) { // If not weekend
    now.set({ hour: GENERATE_CALENDAR_HOUR_ENTER, minute: getRandomMinute(), second: 0 })
    days.push(now.format(SAVE_FORMAT))
    now.set({ hour: GENERATE_CALENDAR_HOUR_EXIT, minute: getRandomMinute(), second: 0 })
    days.push(now.format(SAVE_FORMAT))
  }
  now.add(1, 'day');

  if (now.year() === lastYear && now.month() === lastMonth && now.date() === lastDay) {
    break;
  }
}

console.log(JSON.stringify(days, null, 2));
