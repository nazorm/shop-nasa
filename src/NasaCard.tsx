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
    nasa_id:number
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
            <h3>{data[0].title}</h3>
            <span>Photographed by : {data[0].photographer}</span>
            <img src={links[0].href} alt='nasa' style={{width:'100%'}} />
            <img
        src={likedNasaData.includes(data[0].nasa_id) ? redHeartShape : heartShape}
        className={"liked"}
        alt="liked"
        onClick={() => handleLiked(data[0].nasa_id)}
      />
            <span>Date Captured {date}</span><br/>
            <span>Location {data[0].location}</span>
            <p className='description'>{data[0].description}</p>



        </div>);
}

export default NasaCard;