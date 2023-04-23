const { Scheduler } = require("node-resque");
const { connectionDetails } = require("../utils/connection_details");

function initializeScheduler() {
    return new Scheduler({ connection: connectionDetails });
}

async function startScheduler(scheduler) {
    await scheduler.connect();
    scheduler.start();
}

async function stopScheduler(scheduler) {
    await scheduler.end();
}

function registerSchedulerEvents(scheduler) {
    scheduler.on("start", () => {
        console.log("scheduler started");
    });

    scheduler.on("end", () => {
        console.log("scheduler ended");
    });
    
    scheduler.on("poll", () => {
        console.log("scheduler polling");
    });
    
    scheduler.on("leader", () => {
        console.log("scheduler became leader");
    });
    
    scheduler.on("error", (error) => {
        console.log(`scheduler error >> ${error}`);
    });
    
    scheduler.on("cleanStuckWorker", (workerName, errorPayload, delta) => {
        console.log(
          `failing ${workerName} (stuck for ${delta}s) and failing job ${errorPayload}`
        );
    });
    
    scheduler.on("workingTimestamp", (timestamp) => {
        console.log(`scheduler working timestamp ${timestamp}`);
    });

    scheduler.on("transferredJob", (timestamp, job) => {
        console.log(`scheduler enquing job ${timestamp} >> ${JSON.stringify(job)}`);
    });
}

module.exports = { startScheduler, stopScheduler, initializeScheduler, registerSchedulerEvents };