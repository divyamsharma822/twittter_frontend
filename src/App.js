import logo from "./logo.svg";
import "./App.css";
import { TbPhotoFilled } from "react-icons/tb";
import {
  BsFillPlayCircleFill,
  BsThreeDots,
  BsFillHeartFill,
  BsShareFill,
} from "react-icons/bs";
import { FaUpload, FaRetweet } from "react-icons/fa";
import { data } from "./dummyData/data";
import { FaCommentDots } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import Tweets from "./components/Tweets";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function App() {
  const [ tweets, setTweets]=useState([]);
  useEffect(()=>{
    const fetchpost =async()=>{
      try {
        const response = await axios.get("http://localhost:8000/api/v1/tweet");
         setTweets(response.data);
       
        
      } catch (error) { 
        console.log(error); 
      }
    } 
    
    fetchpost();
      },[]);

  const handleSubmit = async()=>{
    try {
      
      const data= await axios.post('http://localhost:8000/api/v1/tweet',{
        image: selectedImage,
        description,
        userOwner: localStorage.getItem('userID'),

      },{headers:{authorization:cookies.access}});
      
      console.log(data.data);
      alert("Posted")
     } catch (error) {
       console.log("cerror", error);
     }
  }
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access"]);
  const [isExpanded, setIsExpanded] = useState(false);
  const storedData = localStorage.getItem("userDetail");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };
  const parsedData = JSON.parse(storedData);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="App text-white grid lg:grid-cols-4 gap-3 lg:px-14  px-2 grid-cols-1 ">
      {/* user */}
      {cookies.access ? (
        <div className=" bg-slate-800 rounded-lg  grow-0 userCard">
          <div className="  grid grid-flow-row rounded-lg  relative">
            <div className=" bg-sky-500 rounded-t-lg h-36 "></div>
            <div className="flex flex-col justify-end items-center h-36 ">
              <h1 className=" font-semibold text-xl"> {parsedData?.name}</h1>
              <h2 className=" text-gray-300"> {parsedData?.email}</h2>
            </div>
            <div className=" absolute bg-transparent left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center gap-2">
              <img
                className=" aspect-square h-2/5 rounded-full ring-4 ring-offset-0 ring-gray-200"
                src={parsedData?.image}
              ></img>
            </div>
          </div>
          <hr class="h-px my-2 bg-gray-100 border-0 dark:bg-gray-600"></hr>
          <div className=" flex justify-around items-start ">
            <div className=" flex flex-col ">
              <h1 className=" font-semibold text-2xl">3</h1>
              <h2>Following</h2>
            </div>
            <div className=" flex flex-col ">
              <h1 className=" font-semibold text-2xl">0</h1>
              <h2>Follower</h2>
            </div>
          </div>
          <hr class="h-px my-2 bg-gray-100 border-0 dark:bg-gray-600"></hr>
          <div className=" flex justify-center">
            <button className=" text-blue-700 py-3"> Find New People!</button>
          </div>
        </div>
      ) : (
        <div className=" bg-slate-800 rounded-lg  grow-0 userCard">
          <div className="  grid grid-flow-row rounded-lg  relative">
            <div className=" bg-sky-500 rounded-t-lg h-36 "></div>
            <div className="flex flex-col justify-end items-center h-36 ">
              <h1
                className=" font-semibold text-xl text-sky-700 z-10 cursor-pointer  "
                onClick={() => navigate("/login")}
              >
                Login/Register
              </h1>
            </div>
            <div className=" absolute bg-transparent left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center gap-2">
              <img
                className=" aspect-square h-2/5 rounded-full ring-4 ring-offset-0 ring-gray-200"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              ></img>
            </div>
          </div>
          <hr class="h-px my-2 bg-gray-100 border-0 dark:bg-gray-600"></hr>

          <div className=" flex justify-center">
            <button className=" text-blue-700 py-3"> Find New People!</button>
          </div>
        </div>
      )}

      {/* tweet  section */}
      <div className=" md:col-span-2   ">
        <div className=" flex bg-slate-800 rounded-lg flex-col p-3 ">
          <div className=" flex justify-between gap-3 items-center ">
            <input
              onChange={(e) => setDescription(e.target.value)}
              className=" w-full outline-none  outline-sky-600 outline-offset-0 rounded-lg bg-slate-600 py-4 px-2"
              value={description}
              placeholder="Create New Post"
            ></input>
            <button className=" font-bold" onClick={ handleSubmit}>Post</button>
          </div>
          <div className=" lg:grid-cols-4 grid grid-cols-1 gap-3 my-3">
            <div className=" flex justify-center gap-2 px-3 rounded-full  ring-1 ring-gray-500 items-center py-3 text-2xl  cursor-pointer hover:bg-slate-500 ">
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              
              <label htmlFor="image-input" className="custom-image-button flex justify-center items-center gap-2">
              <TbPhotoFilled className=" text-green-500  outline-none border-none " />

<span className=" text-sm font-semibold text-gray-300">
  Photos
</span>
      </label>
              
            </div>
            <div className=" flex justify-center gap-2 px-3 rounded-full  ring-1 ring-gray-500 items-center py-3 text-2xl  cursor-pointer hover:bg-slate-500">
              <BsFillPlayCircleFill className=" text-sky-500  outline-none AiFillSchedule border-none  " />
              <span className=" text-sm font-semibold text-gray-300">
                Photos
              </span>
            </div>
            <div className=" flex justify-center gap-2 px-3 rounded-full  ring-1 ring-gray-500 items-center py-3 text-2xl  cursor-pointer hover:bg-slate-500">
              <FaUpload className=" text-red-500  outline-none border-none  " />
              <span className=" text-sm font-semibold text-gray-300">
                Photos
              </span>
            </div>
            <div className=" flex justify-center gap-2 px-3 rounded-full  ring-1 ring-gray-500 items-center py-3 text-2xl  cursor-pointer hover:bg-slate-500">
              <AiFillSchedule className=" text-yellow-500  outline-none border-none  bg-transparent" />
              <span className=" text-sm font-semibold text-gray-300">
                Photos
              </span>
            </div>
          </div>

          {selectedImage && (
                <div>
                 
                  <img 
                    src={selectedImage}
                    alt="Selected"
                    className=" aspect-video h-40  rounded-lg object-cover object-left-top"
                  />
                </div>
              )}
        </div>
        {/* tweets */}

        {tweets.map((item) => {
          return (
            <Tweets
              name={item.name}
              text={item.description}
              image={item.userImage}
              user={item.email}
              
            />
          );
        })}
      </div>

      {/* notes */}
      <div className=" bg-slate-800 rounded-lg  max-h-44">
        <div className="flex flex-col px-4 items-start py-5 gap-2">
          <h1 className=" text-sky-600 font-semibold  text-xl">
            Features Fulfilled{" "}
          </h1>
          <div className=" flex flex-col gap-1">
            <div className=" flex justify-start gap-2 items-center text-green-500">
              <AiFillCheckCircle />
              <h2 className=" text-sm font-semibold"> Login/Logout With JWT</h2>
            </div>
            <div className=" flex justify-start gap-2 items-center text-green-500">
              <AiFillCheckCircle />
              <h2 className=" text-sm font-semibold"> Registration</h2>
            </div>
            <div className=" flex justify-start gap-2 items-center text-green-500">
              <AiFillCheckCircle />
              <h2 className=" text-sm font-semibold">
                {" "}
                Tweet/Create/Login/Delete
              </h2>
            </div>
            <div className=" flex justify-start gap-2 items-center text-green-500">
              <AiFillCheckCircle />
              <h2 className=" text-sm font-semibold"> Fully Responsive</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
