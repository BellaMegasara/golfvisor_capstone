import { useState } from "react";
import lens from "../assets/lens.png";
import golfer from "../assets/golfer.jpg";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

type SearchProp = {
  setSearch: (value: string) => void;
};

const Searchbar = ({ setSearch }: SearchProp) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onPlaceSelected = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const searchValue = place.name || place.formatted_address || "";
        setSearch(searchValue); 
      }
    }
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyCAw8JWkCBz8m7H0X8FsgDSdhUpqzeJ8CE"
        libraries={["places"]}
      >
        <div className="flex border border-spacing-1 p-3 shadow-lg rounded-full ml-60 mt-10 w-8/12">
          <img src={lens} className="w-6 h-6" alt="Search icon" />

          {/* Autocomplete input */}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceSelected}>
            <input
              type="text"
              placeholder="Search by golf course name/address"
              className="ml-3 w-96 outline-none"
            />
          </Autocomplete>
        </div>
      </LoadScript>

      <div className="p-16">
        <img
          src={golfer}
          className="h-screen w-screen rounded-xl"
          alt="Golfer"
        />
      </div>
    </>
  );
};

export default Searchbar;
