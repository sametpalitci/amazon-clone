const {API_USERS_PORT, HOST_URL} = process.env;

module.exports = {
    "services": {
        "users": {
            "apiName": "users",
            "port": API_USERS_PORT
        }
    },
    'host': HOST_URL
}