import { useEffect, useState } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';

const Marker = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => <div style={{ fontSize: 24 }}>{text}</div>;

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  useEffect(() => {
    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
      );
    } else {
      alert('Le navigateur ne supporte pas cela, besoin de votre position');
    }
  }, []);

  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      {lat && lng ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDbLPaCMwDuKbkRfjCcjOHySCkR59gLGsM' }}
          center={{ lat: lat, lng: lng }}
          defaultZoom={11}
        >
          <Marker lat={lat} lng={lng} text="🏡" />
        </GoogleMapReact>
      ) : (
        <p>Besoin de votre position</p>
      )}
    </div>
  );
}

export default App;
