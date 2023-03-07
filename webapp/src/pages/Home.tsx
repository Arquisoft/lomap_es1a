import Map from "../components/Map";
export default function Home() {
  return (
    <div>
      <h1>Welcome to LoMap!</h1>
      <Map lng={4.34878} lat={50.85045} zoom={10}/>
    </div>
  );
}