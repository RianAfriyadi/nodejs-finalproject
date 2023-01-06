const dotenv = require('dotenv')
dotenv.config()

const { DATABASE_LOCATION } = process.env;

const appConfig = {
    databaseLocation: DATABASE_LOCATION
}

module.exports = appConfig