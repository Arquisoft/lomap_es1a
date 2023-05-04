import express,{Application} from 'express'; 
import cors from "cors";
import https from "https";
import fs from "fs";

var app: Application = express();
const portProduction: number = 3000;

/*app.use(cors({
    origin: '*', //Admitimos todos los origenes 
    credentials: true
}));*/

app.use(express.static('build'));

const options = {
    key: fs.readFileSync('./certificate/private-key.pkey'),
    cert: fs.readFileSync('./certificate/certificate.cert')
}

https.createServer(options, app).listen(portProduction, ():void => {
    console.log('Server HTTPS. Webapp started on port '+ portProduction);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});
