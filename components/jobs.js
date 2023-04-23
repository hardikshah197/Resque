const { Plugins } = require("node-resque");
const { tryShutdown } = require("../utils/helper");

function registerJobs(jobsToComplete, obj) {
    return {
        'add': {
            plugins: [Plugins.JobLock],
            pluginOptions: {
                JobLock: { reEnqueue: true },
            },
            perform: async (a, b) => {
                await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
                jobsToComplete--;
                
                tryShutdown(jobsToComplete, obj);
    
                const answer = a + b;
                return answer;
            },
        },
        'subtract': {
            perform: (a, b) => {
                jobsToComplete--;
                
                tryShutdown(jobsToComplete, obj);
        
                const answer = a - b;
                return answer;
            },
        },
    };
}

module.exports = { registerJobs };