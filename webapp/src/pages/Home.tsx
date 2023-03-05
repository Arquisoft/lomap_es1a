import placeholder_map from '../images/placeholder_map.png';

export default function Home() {
  return (
    <div>
      <h1>Welcome to LoMap!</h1>
      <img width="600" height="500" src={placeholder_map} alt="Map" />
    </div>
  );
}