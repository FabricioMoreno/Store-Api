require("dotenv").config()
//async errors\
require("express-async-errors")


const express = require("express")
const app = express()
const PORT = process.env.port || 5000
const connectDB = require("./db/connect")
const productsRouter = require("./routes/products")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

//middlewares
app.use(express.json())


//Routes
app.get("/",(req,res)=>{

    res.send(`
    <h1>STORE API</h1>
    <a href="/api/v1/products">Go to the api</a>
    `)
})

app.use("/api/v1/products",productsRouter)

//products route

//Errors handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
 


const start = async()=>{
    try {
        //connectDB
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT,()=>{
            console.log("Listening on port " + PORT)
        })
    } catch (err) {
        console.error(err)
    }
}

start()