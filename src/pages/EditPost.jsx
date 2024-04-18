import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    async function getPostById() {
      const { data } = await axios.get(`http://localhost:3000/api/posts/${id}`);
      console.log(data);
      setTitle(data.post.title);
      setDescription(data.post.description);
      setImage(data.post.image);
      setPreviewImage(data.post.image);
    }
    getPostById();
  }, [id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      const { data } = await axios.patch(
        `http://localhost:3000/api/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   navigate("/");
      // Toast
      toast.success("Product update successfully!");
    } catch (error) {
      toast.error("Edit Post failed. Please try again later.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // For preview
    }
  };
  return (
    <>
        
          

        <h1 className="font-bold text-black flex justify-center my-10 text-4xl italic">Update Post </h1>
      <div className="flex justify-center items-center flex-col relative  mb-16">
        <div className="bg-gray-200 p-10 my-10 rounded-xl shadow-md   ">
        {/* <h1 className=" text-white  text-2xl absolute -top-14 font-bold left-0 border rounded-full  bg-black py-2 px-5 ">Update Post </h1> */}
          <form
            className="flex flex-col w-96 font-bold  "
            onSubmit={handleEditSubmit}
          >
            <label className="text-slate-800 opacity-90 mb-2">Title Post</label>
            <input
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100 "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <label className="mt-6 text-slate-800 opacity-90 mb-2">
              Description Post
            </label>
            <input
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <label className="mt-6 text-slate-800 opacity-90 mb-2  ">
              Image Post
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full h-11 bg-neutral-100 "
              //   onChange={(e) => {
              //     console.log(e.target.files[0]);

              //   }}
              onChange={handleImageChange}
            />

            {/* <input type="file"  className="input input-bordered w-full " /> */}

            <button className="btn mt-6">Sumbit</button>
          </form>
        </div>
        <div className="d-flex mb-3 absolute -top-6">
        <div className="flex-shrink-0">
          <img
            className="rounded-full w-28 h-28 object-cover"
            src={previewImage} 
            alt=""
          />
        </div>
      </div>
        
      </div>
          
      {/* <div className="  rounded-box h-48 overflow-hidden w-48 ">
          <img src={previewImage} alt="image" className=" " />
        </div> */}
      
    </>
  );
}
