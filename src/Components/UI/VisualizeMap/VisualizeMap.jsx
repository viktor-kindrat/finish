import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google, lng, lat }) => {
    // Add default values for lat and lng if they are not provided
    const defaultLat = 0; // Change this to an appropriate default value
    const defaultLng = 0; // Change this to an appropriate default value

    // Use the provided lat and lng values, or use the default values if not provided
    const finalLat = lat || defaultLat;
    const finalLng = lng || defaultLng;

    return (
        <>
            
            <Map
                style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute"
                }}
                google={google}
                zoom={18}
                initialCenter={{ lat: finalLat, lng: finalLng }}>
                <Marker
                    position={{ lat: finalLat, lng: finalLng }}
                    draggable={false}
                />
            </Map>
        </>
    );
};


export default GoogleApiWrapper({
    apiKey: "AIzaSyA2w4bmkINSc8U15MEX543BLZmlSp5GPlI",
    language: "uk"
})(MapContainer);
