import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { PinData } from '../context/PinContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const inputRef = useRef(null);
    const [file, setFile] = useState('');
    const [filePrev, setFilePrev] = useState('');
    const [title, setTitle] = useState("");
    const [pin, setPin] = useState("");
    const { addPin,pinLoading } = PinData();

    const handleClick = () => {
        inputRef.current.click();
    }
    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFilePrev(reader.result);
            setFile(file);
        }

    }

    const navigate = useNavigate();
    const addPinHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("pin", pin);
        formData.append("file", file);
        addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
    }
    return (
        <div>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                <div className='flex mt-20 items-center justify-center'>
                    <div onClick={handleClick} className='flex flex-col items-center justify-center w-80 h-auti p-6 bg-white rounded-lg shadow-lg'>
                        {filePrev && <img src={filePrev} alt="" />}

                        <div className='flex flex-col items-center justify-center h-full cursor-pointer'>
                            <input ref={inputRef} onChange={changeFileHandler} type="file" accept='image/*' className='hidden' />
                            <div className='w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full'><FaPlus /></div>
                            <p className='text-gray-500'>Choose a file</p>
                        </div>
                        <p className='mt-4 text-sm text-gray-400 text-center'>We recommended using high quality .jpg files but less than 10mb</p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-center bg-gray-100">
                        <form onSubmit={addPinHandler} className='w-full max-w-lg p-6 bg-white roundedlg shadow-lg'>
                            <div className='mb-4'>
                                <label htmlFor="title" className='block text-sm font-medium text-gray-700'>title</label>
                                <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" id='title' className='common-input' />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="pin" className='block text-sm font-medium text-gray-700'>pin</label>
                                <input required value={pin} onChange={(e) => setPin(e.target.value)} type="text" id='pin' className='common-input' />
                            </div>
                            <button disabled={pinLoading} className='common-btn'>{pinLoading?"Adding...":"Add"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;