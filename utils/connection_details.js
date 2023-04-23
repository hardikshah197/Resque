require("dotenv").config();

const connectionDetails = {
    pkg: "ioredis",
    host: process.env.HOST || "127.0.0.1",
    password: process.env.PASSWORD || null,
    port: process.env.PORT || '6379',
    database: 0,
    // namespace: 'resque',
    // looping: true,
    // options: {password: 'abc'},
};

module.exports = { connectionDetails };