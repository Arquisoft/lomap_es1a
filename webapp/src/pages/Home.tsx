import Map from "../components/Map";
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <article style={{margin:"20vh 15vw", paddingBottom:"5em", width:"50vw",border:"solid", borderColor:"black"}}>
      <h1 style={{textAlign:"center"}}>Welcome to LoMap!</h1>
      <div style={{display:"flex", justifyContent:"center"}}>
        <Map lng={4.34878} lat={50.85045} zoom={10}/>
      </div>
    </article>
  );
}