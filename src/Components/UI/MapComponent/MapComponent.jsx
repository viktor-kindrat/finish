import { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google, stationId, handleMarkerChange }) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    const handleMapClick = (mapProps, map, clickEvent) => {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();

        setMarkerPosition({ lat, lng });
        handleMarkerChange({ lat, lng, stationId });
    };

    const handleMarkerDrag = (markerProps, marker, dragEvent) => {
        const { latLng } = dragEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();

        setMarkerPosition({ lat, lng });
        handleMarkerChange({ lat, lng, stationId });
    };

    return (
        <Map
            style={{
                height: "100%",
                width: "100%", 
                position: "relative"
            }}
            google={google}
            zoom={18}
            initialCenter={{
                lat: 50.40646595699121,
                lng: 30.519675596752958
            }}
            onClick={handleMapClick}
        >
            {markerPosition && (
                <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragend={handleMarkerDrag}
                />
            )}
        </Map>

    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyA2w4bmkINSc8U15MEX543BLZmlSp5GPlI", // Replace with your API key
    language: "uk"
})(MapContainer);
