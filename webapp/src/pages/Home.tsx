import Map from "../components/Map";
import Box from '@mui/material/Box';
import Filter from '../components/home/Filter';
import "./Home.css";

export default function Home() {
  return (
    <article className="homearticle">
      <div className="mapdiv">
        <Map lng={4.34878} lat={50.85045} zoom={12} mapWidth='100%' mapHeight='100%'/>
      </div>
      <div className="filterDiv">
        <Filter />
      </div>
    </article>
  );
}