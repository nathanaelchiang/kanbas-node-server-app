import express from 'express'
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import "dotenv/config";

// mongoose.connect("mongodb+srv://nathanael:supersecretpassword@cluster0.y3gf4zw.mongodb.net/");
const CONNECTION_STRING = 'mongodb+srv://nathanael:supersecretpassword@cluster0.y3gf4zw.mongodb.net/' || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(express.json()); 

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: 'kanbas-node-server-app-64gs.onrender.com/',
    };
  }
  app.use(session(sessionOptions));
   
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
Hello(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
 