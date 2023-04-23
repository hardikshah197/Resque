const { Worker } = require("node-resque");
const { connectionDetails } = require("../utils/connection_details");

function initializeWorker(queues = [], jobs = {}) {
    return new Worker(
        { connection: connectionDetails, queues },
        jobs
    );
}

async function startWorker(worker) {
    await worker.connect();
    worker.start();
};

async function stopWorker(worker) {
    await worker.end()
}

function registerWorkerEvents(worker) {
    worker.on("start", () => {
        console.log("worker started");
    });

    worker.on("end", () => {
        console.log("worker ended");
    });

    worker.on("cleaning_worker", (worker, pid) => {
        console.log(`cleaning old worker ${worker}`);
    });

    worker.on("poll", (queue) => {
        console.log(`worker polling ${queue}`);
    });

    worker.on("ping", (time) => {
        console.log(`worker check in @ ${time}`);
    });

    worker.on("job", (queue, job) => {
        console.log(`working job ${queue} ${JSON.stringify(job)}`);
    });

    worker.on("reEnqueue", (queue, job, plugin) => {
        console.log(`reEnqueue job (${plugin}) ${queue} ${JSON.stringify(job)}`);
    });

    worker.on("success", (queue, job, result, duration) => {
        console.log(
            `job success ${queue} ${JSON.stringify(job)} >> ${result} (${duration}ms)`
        );
    });

    worker.on("failure", (queue, job, failure, duration) => {
        console.log(
            `job failure ${queue} ${JSON.stringify(
            job
            )} >> ${failure} (${duration}ms)`
        );
    });

    worker.on("error", (error, queue, job) => {
        console.log(`error ${queue} ${JSON.stringify(job)}  >> ${error}`);
    });

    worker.on("pause", () => {
        console.log("worker paused");
    });    
}

module.exports = { startWorker, stopWorker, initializeWorker, registerWorkerEvents };