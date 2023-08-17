import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google, lng, lat }) => {
    const defaultLat = 0; 
    const defaultLng = 0; 

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
                initialCenter={{ lat: lat || defaultLat, lng: lng || defaultLng }}>
                <Marker
                    position={{ lat: lat || defaultLat, lng: lng || defaultLng }}
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
