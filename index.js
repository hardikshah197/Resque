const { registerJobs } = require('./components/jobs');
const { initializeWorker, startWorker, stopWorker, registerWorkerEvents } = require('./components/worker');
const { initializeQueue, registerQueueEvents, connectQueue, disconnectQueue } = require('./components/queue');
const { initializeScheduler, startScheduler, stopScheduler, registerSchedulerEvents } = require('./components/scheduler');

const { tryShutdown } = require("./utils/helper");


let jobsToComplete = 0;
let queues = ["math", "otherQueue"];

async function start() {
    let queue = null, worker = null, jobs = null, scheduler = null; 
    
    jobsToComplete = 5;

    queue = initializeQueue();
    scheduler = initializeScheduler();
    jobs = registerJobs(jobsToComplete, { worker, scheduler });
    worker = initializeWorker(queues, jobs);
    
    await startWorker(worker);
    await startScheduler(scheduler);

    // Registering events of worker and scheduler and Queue
    registerWorkerEvents(worker);
    registerSchedulerEvents(scheduler);    
    registerQueueEvents(queue);

    await connectQueue(queue);
    
    await queue.enqueue("math", "add", [1, 2]);
    await queue.enqueue("math", "add", [1, 2]);
    await queue.enqueue("math", "add", [2, 3]);
    await queue.enqueue("math", "subtract", [2, 1]);
    await queue.enqueueIn(3000, "math", "subtract", [5, 2]);

    // and when you are done
    // disconnectQueue(queue);
    // stopScheduler(scheduler);
    // stopWorker(worker);
}

start();