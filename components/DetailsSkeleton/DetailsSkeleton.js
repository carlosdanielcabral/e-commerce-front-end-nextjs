import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './DetailsSkeleton.module.css';

const DetailsSkeleton = () => (
  <div className={ styles.detailsSkeleton }>
    <div className="left">
      <Skeleton variant="rectangular" className={ styles.titleSkeleton }/>
      <Skeleton sx={{ my: 2 }} variant="rectangular" className={ styles.imageSkeleton }/>
    </div>

    <div className="right">
      <Skeleton variant="rectangular" width={230} height={20}/>
      <Skeleton sx={{ my: 2 }}variant="rectangular" width={100} height={20}/>
      <Skeleton sx={{ my: 2 }}variant="rectangular" width={300} height={40}/>
    </div>
  </div>
);

export default DetailsSkeleton;
