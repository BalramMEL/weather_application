import Search from "./Search";

export default function Header({ onSearch, onCurrentLocation }) {
const apiKey = "ebac22e0a3d2dc0b9869d7b9bd94d79e";
  // const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Convert coordinates to city name using reverse geocoding
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
            );
            const data = await response.json();
            const cityName = data[0].name;
            onCurrentLocation(cityName);
          } catch (error) {
            console.error("Error getting current location weather:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <header className="w-full p-4 flex justify-center gap-5 items-center border-b border-white border-opacity-25 bg-white bg-opacity-25 shadow-[0_0_16px_0_rgba(255,255,255,0.25)] backdrop-blur">
      <Search onSearch={onSearch} />
      <div className="w-auto">
        <button className="px-3 py-2" onClick={handleCurrentLocation}>
          Current location
        </button>
      </div>
    </header>
  );
}
