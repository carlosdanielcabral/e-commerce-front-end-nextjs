import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './ProductSkeleton.module.css';

const ProductSkeleton = () => (
  <div className={ styles.productSkeleton }>
    <Skeleton variant="rectangular" width={230} height={140} className={ styles.skeleton } />
    <Skeleton sx={{ my: 2 }} variant="rectangular" width={230} height={20} className={ styles.skeleton } />
    <Skeleton variant="rectangular" width={230} height={20} className={ styles.skeleton } />
    <Skeleton sx={{ my: 2 }}variant="rectangular" width={100} height={20} className={ styles.skeleton } />
  </div>
);

export default ProductSkeleton;
