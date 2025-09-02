import { getCurrentUser } from "@/atoms/userAtom";
import { apiClient } from "@/lib/apiClient";

setInterval(() => {
  if (getCurrentUser()) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      apiClient.user.location
        .put({
          latitude,
          longitude,
        })
        .catch((error) => {
          console.error("Error updating location:", error);
        });
    });
  }
}, 30000);
