"use client"
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMaps = () => {
    const containerStyle = {
        width: '100%',
        height: '400px',
      };

      const center = {
        lat: 23.965570987174186,
        lng: 88.54323340639851,
      };
    return (
      <div className='h-[400px] mb-10'>

        <LoadScript googleMapsApiKey= {`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
        {/* <LoadScript googleMapsApiKey= {`AIzaSyDI_DJD_O3GmkNrAq5rbkevcAqDcAya9uU`}> */}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
      </div>
    );
};

export default GoogleMaps;