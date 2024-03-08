import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//1. connect to db
connectDB();
 
//2. listen to server

app.listen(5000,()=>{
    console.log(process.env.CONN_URI);
    console.log(`server is working on port:${process.env.PORT_NO} in ${process.env.NODE_ENV} Mode`);
});
