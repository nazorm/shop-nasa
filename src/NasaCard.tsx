import React, { FunctionComponent } from "react";


export interface NasaCardProps {
    data: IData[],
    links: ILinks[],
    album?: IAlbum[]
}
interface IData {
    date_created: string,
    description: string,
    location: string,
    title: string,
    photographer: string
}
interface ILinks {
    href: string,
}
interface IAlbum {
    o: string,
}

const NasaCard: FunctionComponent<NasaCardProps> = ({ data, links, album }) => {

    const date = new Date(`${data[0].date_created}`).toLocaleDateString();

    return (
        <div className='nasa-data-card'>
            <h3>{data[0].title}</h3>
            <span>Photographed by : {data[0].photographer}</span>
            <img src={links[0].href} alt='nasa' style={{width:'100%'}} />
            <span>Date Captured {date}</span><br/>
            <span>Location {data[0].location}</span>
            <p className='description'>{data[0].description}</p>



        </div>);
}

export default NasaCard;