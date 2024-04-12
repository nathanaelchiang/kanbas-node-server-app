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

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

// mongoose.connect("mongodb+srv://nathanael:supersecretpassword@cluster0.y3gf4zw.mongodb.net/");

const app = express();
app.use(cors({credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));
  
  
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
Hello(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
