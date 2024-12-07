import React from 'react'
import { FaPlus } from 'react-icons/fa';

const Create = () => {
  return (
    <div>
        <div className="flex flex-erap justify-center items-center gap-2 mt-10">
            <div className='flex mt-20 items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-80 h-auti p-6 bg-white rounded-lg shadow-lg'>
                    <div className='flex flex-col items-center justify-center h-full cursor-pointer'>
                        <input type="file" accept='image/*' className='hidden' />
                        <div className='w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full'><FaPlus/></div>
                        <p className='text-gray-500'>Choose a file</p>
                    </div>
                    <p className='mt-4 text-sm text-gray-400 text-center'>We recommended using high quality .jpg files but less than 10mb</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create;