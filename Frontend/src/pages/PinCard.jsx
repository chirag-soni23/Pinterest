import React from 'react';
import { Link } from 'react-router-dom';

function PinCard({ pin }) {
  return (
    <div className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
      <div className="bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer">
        <img src={pin.image.url} className='w-full h-full object-cover' alt="" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Link 
              to={`/pin/${pin._id}`} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100"
            >
              View Pin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinCard;
