// --------- PROD KEYS -----------
// uses the environmnet variables declared in the remote Heroku environment
module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}