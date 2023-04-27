import express,{Application} from 'express'; 
import cors from "cors";
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app: Application = express()
const port: number = 3000;


app.use(cors({
    origin: '*', //Admitimos todos los origenes 
    credentials: true
}));

app.use(express.static('build'));

app.listen(port, ():void => {
    console.log('Webapp started on port '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});