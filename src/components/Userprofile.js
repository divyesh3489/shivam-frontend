import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function Userprofile() {
  const { isLoggedIn } = useAuth();
  const [postData, setPostData] = useState([]);
  const [cookies, setCookie] = useCookies(["refresh", "access"]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/auth/profileblog/", {
        headers: {
          Authorization: "JWT " + cookies.access,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPostData(res.data);
        } else {
          setPostData([]);
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => { });
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8000/api/user/postdelete/${id}`, {
        headers: {
          Authorization: "JWT " + cookies.access,
        },
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          window.location.reload();
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (username) => {
    axios
      .post("http://localhost:8080/api/post/deleteuser", { username })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          setCookie("token", "", { path: "/", maxAge: -1 });
          setCookie("token", "", { path: "/", maxAge: -1 });
          setCookie("token", "", { path: "/", maxAge: -1 });
          window.location.reload();
        } else if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [openImage, setOpenImage] = useState(false);

  const toggleImage = () => {
    setOpenImage(!openImage);
  };

  const closeImage = () => {
    setOpenImage(false);
  };
  const [image, setImage] = useState(null)
  const updateImage = (e) => {
    e.preventDefault()
    console.log(image)
    if (image) {
      axios.put("http://localhost:8000/api/user/updateimage/", { "image": image }, {
        headers: {
          Authorization: "JWT " + cookies.access,
          "Content-Type": "multipart/form-data"
        }
      })
    }
  }
  useEffect(() => {
    console.log(isLoggedIn)
  }, [])
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="container mx-auto px-4 py-8 bg-[#ffffff]">
            {/* Profile Photo and Follow Button */}
            <div className="text-center">
              <button onClick={toggleImage}><img
                className="h-32 w-32 rounded-full mx-auto mb-4"
                src={"http://localhost:8000" + isLoggedIn.image}
                // srcSet="images/alternate.jpg"
                alt="Profile"
                style={{ border: "1px solid black", backgroundColor: "black" }}
              /></button>
              {openImage && (
                <div
                  id="defaultModal"
                  tabIndex="-1"
                  aria-hidden="true"
                  style={{ animation: 'fadeIn 0.3s ease-in' }}
                  className="w-screen h-screen bg-gray-200/25  z-50 fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div className="relative w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Modal header */}
                      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Update Profile
                        </h3>
                        <button
                          onClick={closeImage}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="defaultModal"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* Modal body */}
                      <div className="p-6 space-y-6">
                        <form onSubmit={updateImage}><h2 className="text-2xl text-start mb-3">Update image</h2><input
                          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                          type="file"
                          name="image"
                          id="formFile"
                          required
                          accept="image/*"
                          onChange={(e) => { setImage(e.target.files[0]) }}
                        />
                          <Button
                            type="submit"
                            className="mt-6 bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
                            fullWidth
                          >
                            update Image
                          </Button> </form>

                      </div>
                      {/* Modal footer */}

                    </div>
                  </div>
                </div>
              )}
              <h1 className="text-2xl font-semibold">{isLoggedIn.username}</h1>
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-10">Uploaded Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Replace with a map function to generate responsive photo cards */}
                {/* Example card */}

                {postData ? (
                  <>
                    {postData.map((data, index) => {
                      return (
                        <div
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                          key={index}
                        >
                          <img
                            src={data.image}
                            alt="Uploaded-Something"
                            className="w-full h-48 object-cover "
                          />{" "}

                          <div className="p-4">
                            <h3 className="text-lg font-semibold ">
                              {data.title}
                            </h3>

                            <p className="text-gray-600">
                              {" "}
                              <b>Tags :</b>
                              {data.Art && <>Art</>}
                              {"  "}
                              {data.Lifestyle && <>Lifestyle</>}
                              {"  "}
                              {data.Nature && <>Nature</>}
                              {"  "}
                              {data.Technology && <>Technology</>}
                              {"  "}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-1/2"
                              onClick={() => deletePost(data.blog_id)}
                            >
                              Delete Post
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className="flex justify-end me-10">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => deleteUser(isLoggedIn.username)}
                >
                  Delete Account
                </button>
              </div> */}
              {/* End of example card */}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Userprofile;
