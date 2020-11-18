import React from 'react';
import Plane from './Plane/Plane';


const Planes = ({data}) => {
    return data.map((p,index)=><Plane key={index} stationId={p}/>);
};

export default Planes;