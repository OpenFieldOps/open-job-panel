setTimeout(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Latitude:", latitude, "Longitude:", longitude);
    },
    (error) => {
      console.error("Erreur de géolocalisation :", error.message);
    }
  );
}, 1000);
