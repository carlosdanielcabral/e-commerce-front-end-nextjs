import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import './ProductSkeleton.module.css';

const ProductSkeleton = () => (
  <div className="product-skeleton">
    <Skeleton variant="rectangular" width={230} height={140}/>
    <Skeleton sx={{ my: 2 }} variant="rectangular" width={230} height={20}/>
    <Skeleton variant="rectangular" width={230} height={20}/>
    <Skeleton sx={{ my: 2 }}variant="rectangular" width={100} height={20}/>
  </div>
);

export default ProductSkeleton;
