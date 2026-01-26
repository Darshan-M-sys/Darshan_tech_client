import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaSearch,  FaPlus,FaEdit } from "react-icons/fa";

  
const Course= () => {
  const[authData,setAuthData]=useState({})
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    totalDuration: "",
  });
 const[updateData,setUpdateData]=useState({})
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
const handleChange = (e) => {
  const { name, value } = e.target;

  if (update) {
    setUpdateData(prev => ({
      ...prev,
      [name]: value
    }));
  } else {
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  }
};
  const handleImage = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(course).forEach((key) => {
      formData.append(key, course[key]);
    });
    formData.append("image", thumbnail);

    try {
      await axios.post(
        "http://localhost:5000/admin/course/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
        alert("created successfully")
         handleUsers()
         setCreateCourseShow(false)
  
    } catch (error) {
      console.error(error);
    }
  };

  const [update,setUpdate]=useState(false)
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
 const dataToSend = update ? updateData : course;

Object.keys(dataToSend).forEach((key) => {
  formData.append(key, dataToSend[key]);
});

    formData.append("image", thumbnail);
    try {
      await axios.put(
        `http://localhost:5000/admin/course/update/${updateData._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
          handleUsers()
      alert("Course Created Updated");
      setCreateCourseShow(false)
    } catch (error) {
      console.error(error);
    }
  };

  const [createCourseShow,setCreateCourseShow]=useState(false)
  const [Courses,setCourses]=useState({})
  const [search,setSearch]=useState("")
  const [show,setShow]=useState(false)
const[courseData,setCourseData]=useState([])
  
const handleUsers=async()=>{

try {
   const cou= await axios.get("http://localhost:5000/admin/courses",{withCredentials:true}); 
   setCourseData(cou.data.data||[])

} catch (error) {
  console.log(error)
}
}

const handleCourse=async(id)=>{
  if(id){
   const cor= await axios.get(`http://localhost:5000/admin/courses/${id}`,{withCredentials:true});
try {
setCourses(cor.data.data || {})
if(cor){
  setShow(true)
}
} catch (error) {
  console.log(error)
}
  }
}



const handleUpdateData=async(id)=>{
   const cor= await axios.get(`http://localhost:5000/admin/courses/${id}`,{withCredentials:true});
try {
 setUpdateData(cor.data.data||{})
  setUpdate(true)
if(cor){
 setCreateCourseShow(true)
}
} catch (error) {
  console.log(error)
}
}

const handleDelete=async(id)=>{
  try{
    if(!window.confirm("Are you sure to delete this course?")) return;
  const deleteProfile= await axios.delete(`http://localhost:5000/admin/course/delete/${id}`,{withCredentials:true});
  if(deleteProfile.data.msg==="Course deleted successfully"){
     handleUsers()
  }
}catch(err){
  console.log(err)
}
}

useEffect(()=>{
handleCourse()
},[])

useEffect(()=>{
handleUsers()
},[])


const handleAuth=async()=>{
  try{
  const login= await axios.get("http://localhost:5000/user/login",{withCredentials:true});
  setAuthData(login.data.data|| {})
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  handleAuth()
},[])


  return (
  
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Search */}
          <div className="relative w-full md:w-[300px]">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text" onChange={(e)=>setSearch(e.target.value)} value={search}
              placeholder="Search user..."
              className="pl-10 pr-3 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
 
          {/* Tabs */}
          <div className="flex gap-4">
            <button onClick={()=>setCreateCourseShow(true)} className={`flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-500 text-white text-white shadow`}>
              <FaPlus /> New
            </button>

          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 mt-8 px-4 py-2 text-gray-600 font-semibold border-b">
          <p>Image</p>
          <p>Name</p>
          <p>Duration</p>
          <p className="ml-10">Creator</p>
          <p className="text-center">Action</p>
        </div>


        {/* User List */}
        <div className="max-h-[400px]  overflow-y-auto mt-2 space-y-3">

          {courseData.filter((courses)=>{
            return(
            courses.title.toLowerCase().includes(search.toLowerCase()) || courses.description.toLowerCase().includes(search.toLowerCase()) ||  courses.totalDuration.toLowerCase().includes(search.toLowerCase())
            )
          }).map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center px-4 py-3 rounded-xl bg-white shadow hover:shadow-md transition"
            ><img   onClick={()=>handleCourse(item._id)} className="w-[50px] h-[50px]  rounded-full" src={item.thumbnail} alt={item.username} />
              <p   onClick={()=>handleCourse(item._id)} className="font-semibold">{item.title}</p>
              <p   onClick={()=>handleCourse(item._id)} className="text-gray-600">{item.totalDuration}</p>
              <span   onClick={()=>handleCourse(item._id)} className="text-blue-500 font-semibold ml-10">{item.teacherId?.username}</span>
               <div className="flex justify-center">              <button onClick={()=>handleDelete(item._id)} className="flex justify-center ">
                <MdDelete className="text-red-500 text-xl hover:scale-110 transition" />
              </button>
              <button onClick={()=>handleUpdateData(item._id)} className="flex justify-center ">
                 {authData._id===item.teacherId._id ?<FaEdit  className="text-blue-500 text-xl hover:scale-110 transition"/>:""}
              </button>
              </div>
              {show &&
              <div className="fixed top-[1px] right-[1px] w-full min-h-[100vh] backdrop-blur-[10px] bg-white/30">
                <div className="fixed top-[10px] right-[300px] ">
  <button className="absolute right-2 text-lg" onClick={()=>setShow(false)}>X</button>
    <div className="bg-white shadow shadow-2xl py-10 p-5 flex flex-col justify-center">
   <div className="text-center flex justify-center  flex-col">
    <img className="w-[100px] h-[100px] rounded-full bg-yellow-300 text-center" src={Courses.thumbnail} alt="profile" />
    <p className="font-bold text-xl">{Courses.title}</p>
    <p>{Courses.description}</p>
    <p className="text-sm font-['arial'] bg-yellow-300 ">{Courses.totalDuration}</p>
    <p className="text-sm font-['arial'] bg-yellow-300 ">CreatedAt:{Courses.createdAt}</p>
    <p className="font-semibold"> <span className="text-blue-500">Category-</span>{Courses.category}</p>
    <p className="font-semibold"> <span className="text-blue-500">price-</span>{Courses.price}</p>
    <p className="font-semibold"> <span className="text-blue-500">About Creator</span></p>
    <hr/>
     <img className="w-[100px] h-[100px] rounded-full bg-yellow-300 text-center" src={Courses.teacherId.profile_Imag} alt="profile" />
    <p className="font-bold text-xl">{Courses.teacherId.username}</p>
    <p>{Courses.teacherId.email}</p>
   
    <p className="text-sm font-['arial'] bg-yellow-300 ">{Courses.teacherId.role}</p>
  <p>{Courses.teacherId.bio}</p>
    </div>    
    </div>
    </div>
    </div>
}

{createCourseShow &&
<div className="fixed top-[1px] right-[1px] w-full min-h-[100vh] backdrop-blur-[10px] bg-white/30">
                <div className="fixed top-[1px] right-[300px] h-[550px]  overflow-auto">
  <button className="absolute right-2 top-0 text-lg" onClick={()=>setCreateCourseShow(false)}>X</button>
 <div className=" bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">

      <div className="bg-white w-[600px] p-6 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create New Course
        </h1>

        <form onSubmit={!update?handleSubmit:handleUpdate} className="space-y-4">

          <input
            name="title"
             value={update ? updateData.title || "" : course.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full p-2 border rounded-xl"
          />

     
             <textarea
            name="shortDescription"
             
            onChange={handleChange}
           value={update ? updateData.shortDescription || "" : course.shortDescription}
            placeholder="Course short Description"
            rows="3"
            className="w-full p-2 border rounded-xl"
          />
     <textarea
            name="description"
             
            onChange={handleChange}
           value={update ? updateData.description || "" : course.description}
            placeholder="Course Description"
            rows="3"
            className="w-full p-2 border rounded-xl"
          />

          <select
            name="category"
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
             value={update ? updateData.category || "" : course.category}
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="AI / ML">Python Programming</option>
            <option value="Data Science">Python Full Stack</option>
          </select>

          <div className="flex gap-4">
            <input
              name="price"
              onChange={handleChange}
           value={update ? updateData.price || "" : course.price}
              placeholder="Price ₹"
              className="flex-1 p-2 border rounded-xl"
            />
            <input
              name="totalDuration"
              value={update ? updateData.totalDuration || "" : course.totalDuration}
              onChange={handleChange}
              placeholder="Duration (e.g. 10h)"
              className="flex-1 p-2 border rounded-xl"
            />
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed rounded-xl p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
              id="thumbnail"
            />
            <label
              htmlFor="thumbnail"
              className="cursor-pointer text-blue-500 font-semibold"
            >
              Upload Course Thumbnail
            </label>

            {preview && (
              <img
                src={preview || updateData.thumbnail}
                alt="Preview"
                className="mt-4 h-40 w-full object-cover rounded-xl"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold"
          >
          {!update?  "Publish Course":"update Course"}
          </button>

        </form>
      </div>
    </div>

            </div>

</div>
}
</div>

          ))}

        </div>
      </div>
    </div> 
  )} 


export default Course
