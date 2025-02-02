import express from 'express';
import dotenv from 'dotenv';
import ConnectDB  from './ConnectDB.js';
import formRoutes from './form1Routes.js'
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }))

app.use('/', formRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    ConnectDB();
    console.log('Server Started at http://localhost:3000');
});
