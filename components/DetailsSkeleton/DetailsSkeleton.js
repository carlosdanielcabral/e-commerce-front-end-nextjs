import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import './index.css';

const DetailsSkeleton = () => (
  <div className="details-skeleton">
    <div className="left">
      <Skeleton variant="rectangular" className="title-skeleton"/>
      <Skeleton sx={{ my: 2 }} variant="rectangular" className="image-skeleton"/>
    </div>

    <div className="right">
      <Skeleton variant="rectangular" width={230} height={20}/>
      <Skeleton sx={{ my: 2 }}variant="rectangular" width={100} height={20}/>
      <Skeleton sx={{ my: 2 }}variant="rectangular" width={300} height={40}/>
    </div>
  </div>
);

export default DetailsSkeleton;
