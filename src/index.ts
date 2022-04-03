import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'
import favicon from 'serve-favicon'
import {router} from "./router";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use('/hs_01/api', router);
app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')))

app.get('/', (req: Request, res: Response ) => {
  res.send('<h1>Bloggers API-01</h1>')
})
app.all('*', (req, res) =>{
  res.send(400)
})


app.listen(port, () => {
  console.log('server has been started')
})




