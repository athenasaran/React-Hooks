import React, { useState, useEffect } from 'react'
//useState useEffect é um hook
//descartar o uso de classes
export default function App() {

  const [location, setLocation] = useState({})

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(handlePositionReceived)

    return () => navigator.geolocation.clearWatch(watchId)//component didunmount
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords//desestruturaçao
    setLocation({ latitude, longitude })
  }

  return (

    <>
      Latitude: {location.latitude}<br />
            Longitude: {location.longitude}
    </>


  )
}
