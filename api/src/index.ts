import app from "./app/app.js";
import { connectToDB, disconnectDB } from './db/connection.js'


//db connection 
connectToDB()
    .then(() => {
        app.listen(7000, () => console.log('Server is running on port' + 7000))
    })
    .catch((e) => console.log(e))




