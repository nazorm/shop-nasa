import React, { FunctionComponent, useState } from "react";
import redHeartShape from './assets/redheart-shape.svg';
import heartShape from './assets/heart-shape.svg';

export interface NasaCardProps {
  data: IData[],
  links: ILinks[],
}
interface IData {
  date_created: string,
  description: string,
  location: string,
  title: string,
  photographer: string
  nasa_id: number
}
interface ILinks {
  href: string,
}


const NasaCard: FunctionComponent<NasaCardProps> = ({ data, links }) => {


  const date = new Date(`${data[0].date_created}`).toLocaleDateString();
  const [likedNasaData, setLikedNasaData] = useState<number[]>([]);
  const handleLiked = (id: number) => {
    if (!likedNasaData.includes(id)) {
      setLikedNasaData([...likedNasaData, id]);
    } else {
      const newLikedProducts = likedNasaData.filter(
        (nasaId) => nasaId !== id
      );
      setLikedNasaData(newLikedProducts);
    }
  };
  return (
    <div className='nasa-data-card'>
      <h5 className='title' style={{ marginLeft: '10px', marginTop: '15px' }}>{data[0].title}</h5>
      <span className='photo-credit'>Photographed by : <span className='photographer'>{data[0].photographer}</span> </span>
      <img src={links[0].href} alt='nasa' height='200px' style={{ width: '100%', marginTop: '10px' }} />
      <img
        src={likedNasaData.includes(data[0].nasa_id) ? redHeartShape : heartShape}
        className="liked"
        style={{ display: 'block', margin: '10px' }}
        alt="liked"
        onClick={() => handleLiked(data[0].nasa_id)}
      />
      <span className='date' style={{ margin: '10px' }}>{date}</span><br />
      <span className='location' style={{ margin: '10px' }}>{data[0].location}</span>
      <p className='description' style={{ margin: '10px' }}>{data[0].description}</p>
    </div>);
}

export default NasaCard;