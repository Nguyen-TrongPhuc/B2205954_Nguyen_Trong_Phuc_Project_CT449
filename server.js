const app = require("./app"); 
const config = require("./app/config"); 
//const MongoDB = require("./app/utils/mongodb.util"); 

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });


