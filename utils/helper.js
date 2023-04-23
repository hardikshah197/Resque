async function tryShutdown(jobsToComplete, { worker, scheduler }) {
    if (jobsToComplete === 0) {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        
        await scheduler.end();

        if (worker != null)
            await worker.end();
        
        process.exit();
    }
}
module.exports = { tryShutdown };