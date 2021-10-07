import scheduler from 'node-schedule';
import { Harvesting } from "./Harvesting.js";


export class ApiScheduler{
  static run() {
    const dailyJob = scheduler.scheduleJob('0 0 8 * * *', () => {
      console.log("Starting scheduler");
      Harvesting.run();
    })
  }

}