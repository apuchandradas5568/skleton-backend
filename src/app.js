import express from 'express';
import cors from 'cors'; 
import productRoutes from './routes/product.routes.js'; 

const app = express();

// Use cors middleware to allow cross-origin requests
// app.use(cors({
//          origin: process.env.CORS_ORIGIN,
//         credentials: true
//      }))
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json());
app.use('/api/v1/products', productRoutes);

export default app;



// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// const bodyParser = require('body-parser');

// const app = express()

//routes import
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import promotionRouter from './routes/promotion.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/promotion",promotionRouter);


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(bodyParser.json());

// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())


// //routes import
// import userRouter from './routes/user.routes.js'
// const productRoutes = require('./routes/products.routes.js');


// //routes declaration
// app.use("/api/v1/users", userRouter)
// app.use('/api/products', productRoutes);

// // http://localhost:8000/api/v1/users/register

// export { app }