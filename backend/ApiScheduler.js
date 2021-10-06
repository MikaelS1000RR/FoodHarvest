const scheduler = require('node-schedule');

const ruleScheduler = new scheduler.RecurrenceRule();

ruleScheduler.hour = 00;
ruleScheduler.minute = 00;
ruleScheduler.second = 00;

//From 0 (monday) to 6 (sunday)
ruleScheduler.dayOfWeek = new scheduler.Range(0, 6);
