module.exports = {
    url: process.env.MODE === 'PRODUCTION' ? process.env.database_prod : process.env.database_local
};