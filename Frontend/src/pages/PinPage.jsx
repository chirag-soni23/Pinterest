import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PinData } from '../context/PinContext';
import { Loading } from '../components/Loading';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Pinpage({ user }) {
  const params = useParams();
  const { loading, fetchPin, pin, updatePin, addComment, deleteComment, deletePin, commentLoading } = PinData();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinvalue] = useState("");
  const [comment, setComment] = useState("");

  const editHandler = () => {
    setTitle(pin.title);
    setPinvalue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHandler = (id) => {
    if (confirm("Are you sure you want to delete this comment"))
      deleteComment(pin._id, id);
  }

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin"))
      deletePin(pin._id, navigate);
  }

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div>
      {pin && (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-white mt-20 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-l-lg flex items-center justify-center">
                {pin.image && (
                  <img
                    src={pin.image.url}
                    className="object-cover w-full h-60 md:h-full rounded-t-lg md:rounded-l-lg"
                    alt=""
                  />
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  {edit ? (
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="common-input"
                      style={{ width: "200px" }}
                      placeholder="Edit Title"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{pin.title}</h1>
                  )}

                  {/* Edit and Delete Buttons */}
                  {pin.owner && pin.owner._id === user._id && (
                    <div className="flex gap-2 items-center">
                      <button className='bg-green-500 rounded py-1 px-3' onClick={editHandler}><FaEdit color='#fff' /></button>
                      <button onClick={deletePinHandler} className="bg-red-500 text-white py-1 px-3 rounded"><MdDelete /></button>
                    </div>
                  )}
                </div>

                {edit ? (
                  <input
                    value={pinValue}
                    onChange={(e) => setPinvalue(e.target.value)}
                    className="common-input"
                    style={{ width: "200px" }}
                    placeholder="Edit Pin Value"
                  />
                ) : (
                  <p className="mb-6">{pin.pin}</p>
                )}

                {edit && (
                  <button
                    style={{ width: "200px" }}
                    className="bg-red-500 text-white py-1 px-3 mt-2 mb-2"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                )}

                {/* Owner Details */}
                {pin.owner && (
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex">
                      <Link to={`/user/${pin.owner._id}`}>
                        <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                          <span className="font-bold">{pin.owner.name.slice(0, 1)}</span>
                        </div>
                      </Link>
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">{pin.owner.name}</h2>
                        <p className="text-gray-500">{pin.owner.followers.length} Followers</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <form onSubmit={submitHandler} className="flex-1 flex flex-wrap gap-2">
                      <input
                        className="flex-1 border rounded-lg p-2"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter comment"
                        type="text"
                      />
                      <button disabled={commentLoading} type="submit" className="bg-red-500 px-4 py-2 text-white rounded">{commentLoading?"Adding...":"Add"}</button>
                    </form>
                  </div>

                  <div className="overflow-y-auto px-2 max-h-64 mt-4">
                    {pin.comments && pin.comments.length > 0 ? pin.comments.map((e, i) => (
                      <div key={i} className="flex items-center justify-between mb-4">
                        <Link to={`/user/${e.user}`}>
                          <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                            <span className="font-bold">{e.name.slice(0, 1)}</span>
                          </div>
                        </Link>
                        <div className="ml-4 flex-1">
                          <h2 className="text-lg font-semibold">{e.name}</h2>
                          <p className="text-gray-500">{e.comment}</p>
                        </div>
                        {e.user === user._id && (
                          <button
                            onClick={() => deleteCommentHandler(e._id)}
                            className="bg-red-500 text-white py-1 px-3 rounded"
                          >
                            <MdDelete />
                          </button>
                        )}
                      </div>
                    )) : <p>Be the first one to add comment</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Pinpage;
