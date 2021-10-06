import scheduler from 'node-schedule';

const dailyJob = scheduler.scheduleJob('0 0 8 * * *', () => {
  console.log("Test av scheduler")
})