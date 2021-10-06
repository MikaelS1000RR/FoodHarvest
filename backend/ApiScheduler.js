import scheduler from 'node-schedule';

const dailyJob = scheduler.scheduleJob('0 40 13 * * *', () => {
  console.log("Test av scheduler")
})