import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

import {router} from "./router";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use('/hs_01/api', router);

app.all('*', (req, res) =>{
  res.send(400)
})


app.listen(port, () => {
  console.log('server has been started')
})




