import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
const PinContext = createContext();

export const Pinprovider = ({children})=>{
    const [pins,setPins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [commentLoading,setCommentLoading] = useState(false);
    const [pinLoading,setPinLoading] = useState(false);
    async function fetchPins(){
        try {
            const {data} = await axios.get("/api/pin/all")
            setPins(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchPins()
    },[]);

    async function updatePin(id,title,pin,setEdit){
        try {
            const  {data} = await axios.put("/api/pin/"+id,{title,pin}) 
            toast.success(data.message);
            fetchPin(id);
            setEdit(false)           
        } catch (error) {
            toast.error(error.response.data.message);      
        }
    }

    async function addComment(id,comment,setComment){
        setCommentLoading(true)
        try {
            const {data} = await axios.post("/api/pin/comment/"+id,{comment});
            toast.success(data.message);
            fetchPin(id);
            setComment("");
            setCommentLoading(false);
            
        } catch (error) {
            toast.error(error.response.data.message);
            setCommentLoading(false);
        }
    }

    async function deleteComment(id,commentId){
        try {
            const {data} = await axios.delete(`/api/pin/comment/${id}?commentId=${commentId}`);
            toast.success(data.message);
            fetchPin(id);
        } catch (error) {
            toast.error(error.response.data.message)     
            
        }
    }

    async function deletePin (id,navigate){
        setLoading(true);
        try {
            const {data} = await axios.delete(`/api/pin/${id}`);
            toast.success(data.message);
            navigate("/");
            setLoading(false);
            fetchPins();
        
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);   

            
        }
    }

    const [pin,setPin] = useState([]);
    async function fetchPin(id){
        setLoading(true)
        try {
            const {data} = await axios.get("/api/pin/"+id);
            setPin(data);
            setLoading(false);
                                    
        } catch (error) {
            console.log(error)
            setLoading(false);            
        }
    }

    async function addPin(formData,setFilePrev, setFile, setTitle,setPin,navigate){
        setPinLoading(true);
        try {
            const {data} = await axios.post('/api/pin/new',formData);
            toast.success(data.message);
            setFile([]);
            setFilePrev("");
            setPin("");
            setTitle("");
            fetchPins();
            navigate("/");  
            setPinLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setPinLoading(false);
        }
    }


    return <PinContext.Provider value={{pins,loading,fetchPin,pin,updatePin,addComment,deleteComment,deletePin,commentLoading,addPin,pinLoading}}>{children}</PinContext.Provider>
}

export const PinData = () => useContext(PinContext);