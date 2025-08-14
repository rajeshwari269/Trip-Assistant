import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MapView from '../components/MapView';

interface Photo {
  id: number;
  src: { medium: string };
  alt: string;
}

const PlaceDetails = () => {
  const { placeName } = useParams<{ placeName: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [info, setInfo] = useState<{ lat: number; lon: number; description: string } | null>(null);

  useEffect(() => {
    axios.get(`/api/pexels/search?query=${placeName}`).then(res => {
      setPhotos(res.data.photos);
    });

    axios.get(`/api/place-details/${placeName}`).then(res => {
      setInfo(res.data);
    });
  }, [placeName]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{placeName}</h1>
      {info && <MapView lat={info.lat} lon={info.lon} />}
      <h2 className="text-xl font-semibold my-2">More Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map(photo => (
          <img key={photo.id} src={photo.src.medium} alt={photo.alt} className="rounded" />
        ))}
      </div>
    </div>
  );
};

export default PlaceDetails;
