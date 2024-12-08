import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PinData } from '../context/PinContext';
import PinCard from './PinCard';
import { UserData } from '../context/UserContext';

const UserProfile = ({ user: loggedInUser }) => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollow, setIsFollow] = useState(false);
    const { pins } = PinData();
    const { followUser } = UserData();

    const followHandler = () => {
        setIsFollow(!isFollow);
        followUser(user._id, fetchUser)
    }
    useEffect(() => {
        if (user && user.followers?.includes(loggedInUser._id)) {
            setIsFollow(true);
        }
    }, [user, loggedInUser]);
    let userPins;
    if (pins) {
        userPins = pins.filter(pin => pin.owner == user?._id);
    }

    async function fetchUser() {
        try {
            const { data } = await axios.get(`/api/user/${params.id}`);
            setUser(data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching user data.");
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [params.id]);

    if (loading) return <div>Loading...</div>; // Loading state
    if (error) return <div>{error}</div>; // Error state

    return (
        <div className='mt-14'>
            {user ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="p-6 w-full">
                        <div className='flex items-center justify-center'>
                            <div className='h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center'>
                                {user.name && <span className='text-3xl text-gray-700'>{user.name.slice(0, 1)}</span>}
                            </div>
                        </div>
                        <h1 className='text-center text-2xl font-bold mt-4'>{user.name}</h1>
                        <p className='text-center text-gray-600 mt-2'>{user.email}</p>
                        <p className='flex items-center justify-center gap-3 text-center text-gray-600 mt-2'>
                            {user.followers && <p>{user.followers.length} followers</p>}
                            {user.following && <p>{user.following.length} following</p>}
                        </p>

                        <div className='flex justify-center mt-4 space-x-2'>
                            <button onClick={followHandler} className='bg-gray-200 px-4 py-2 rounded'>{isFollow ? "Unfollow" : "Follow"}</button>
                        </div>

                        <div className='mt-4 flex flex-wrap justify-center gap-4'>
                            {userPins && userPins.length > 0 ? userPins.map((e) => (
                                <PinCard key={e._id} pin={e} />
                            )) : <p>No pins yet</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <div>No user found</div>
            )}
        </div>
    );
}

export default UserProfile;
