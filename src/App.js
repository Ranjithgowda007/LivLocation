import { useEffect, useState } from "react";

export default function App() {

  const [isloc, setIsloc] = useState(false)
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    city: "",
    state: "",
    country: "",
  });
  useEffect(() => {
    function success(position) {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // const geoApiurl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`;
      const geoapiurl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(geoapiurl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLocationData({
            latitude: latitude,
            longitude: longitude,
            city: data.city,
            state: data.principalSubdivision,
            country: data.countryName,
          });
          setIsloc(true)
        })
        .catch((error) => console.error("Error fetching location:", error));
    }

    function error(error) {
      console.error("Error retrieving location:", error);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {isloc && (
      <div>
          <h1>Address:</h1>
        <li>
          Latitude: {locationData.latitude}, longitude: {locationData.longitude}
        </li>
        <li>city: {locationData.city}</li>
        <li>state: {locationData.state}</li>
        <li>country: {locationData.country}</li>
      </div>

      )}
    </div>
  );
}
