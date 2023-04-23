# Resque: The best background jobs in node.

**Distributed delayed jobs in nodejs**. Resque is a background job system backed by [Redis](http://redis.io) (version 2.6.0 and up required). It includes priority queues, plugins, locking, delayed jobs, and more! This project is a very opinionated but API-compatible with [Resque](https://github.com/resque/resque) and [Sidekiq](http://sidekiq.org/) ([caveats](https://github.com/actionhero/node-resque/issues/311)). We also implement some of the popular Resque plugins, including [resque-scheduler](https://github.com/resque/resque-scheduler) and [resque-retry](https://github.com/lantins/resque-retry)

The full API documentation for this package is automatically generated from the `main` via [typedoc](https://typedoc.org) branch and published to https://node-resque.actionherojs.com/

## The Resque Factory (How It Works)

### Overview

Resque is a queue based task processing system that can be thought of as a "Kanban" style factory. Workers in this factory can each only work one Job at a time. They pull Jobs from Queues and work them to completion (or failure). Each Job has two parts: instructions on how to complete the job (the `perform` function), and any inputs necessary to complete the Job.

### Queues

In our factory example, Queues are analogous to conveyor belts. Jobs are placed on the belts (Queues) and are held in order waiting for a Worker to pick them up. There are three types of Queues: regular work Queues, Delayed Job Queues, and the Failed Job Queue. The Delayed Job Queues contains Job definitions that are intended to be worked at or in a specified time. The Failed Job Queue is where Workers place any Jobs that have failed during execution.

### Workers

Our Workers are the heart of the factory. Each Worker is assigned one or more Queues to check for work. After taking a Job from a Queue the Worker attempts to complete the Job. If successful, they go back to check out more work from the Queues. However, if there is a failure, the Worker records the job and its inputs in the Failed Jobs Queue before going back for more work.

### Scheduler

The Scheduler can be thought of as a specialized type of Worker. Unlike other Workers, the Scheduler does not execute any Jobs, instead it manages the Delayed Job Queue. As Job definitions are added to the Delayed Job Queue they must specify when they can become available for execution. The Scheduler constantly checks to see if any Delayed Jobs are ready to execute. When a Delayed Job becomes ready for execution the Scheduler places a new instance of that Job in its defined Queue.

## Version Notes

- The version of redis required is >= 2.6.0 as we use lua scripting to create custom atomic operations
- ‼️ Version 6+ of Node Resque uses TypeScript. We will still include JavaScript transpiled code in NPM releases, but they will be generated from the TypeScript source. Functionality between node-resque v5 and v6 should be the same.
- ‼️ Version 5+ of Node Resque uses async/await. There is no upgrade path from previous versions. Node v8.0.0+ is required.