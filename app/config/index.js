

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    
    Db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/librarybook"
    },
};


module.exports = config;