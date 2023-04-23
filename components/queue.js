const { Queue } = require( "node-resque");
const { connectionDetails } = require( "../utils/connection_details");

function initializeQueue(jobs = {}) {
    return new Queue({ connection: connectionDetails }, jobs);
}

function registerQueueEvents(queue) {
    queue.on("error", function (error) {
        console.log(error);
    });
}

async function connectQueue(queue) {
    await queue.connect();
}

async function disconnectQueue(queue) {
    await queue.end();
}

module.exports = { initializeQueue, registerQueueEvents, connectQueue, disconnectQueue };