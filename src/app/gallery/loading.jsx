import GallerySkeleton from '@/components/skeleton/GallerySkeleton';
import React from 'react';

const loading = () => {
  return (
    <div className='p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {
        [...Array(12)].map((_, index) => <GallerySkeleton key={index}></GallerySkeleton>)
      }

    </div>
  );
};

export default loading;