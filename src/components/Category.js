import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";

function Category() {
  const [allPost, setAllPost] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cookies, setCookies] = useCookies(['access', 'refresh'])
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/blogs/", {
      headers: {
        Authorization: "JWT " + cookies.access
      }
    }).then((res) => {
      if (res.data) {
        setAllPost(res.data);
        setFiltered(res.data);
      } else {
        setAllPost([]);
      }
    });
  }, []);
  const handleCategory = async (param) => {
    const filteredData = await [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i][param]) {
        filteredData.push(filtered[i]);
      }
    }
    setAllPost(filteredData);
  };
  const handleSearchByName = (e) => {
    if (filtered) {
      if (e.target.value === "") {
        setAllPost(filtered);
      } else {
        const filteredData = allPost.filter((data) => {
          return data.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setAllPost(filteredData);
      }
    }
  };
  return (
    <div className="mt-16" style={{ userSelect: "none" }}>
      <h1 className="text-2xl font-semibold sm:text-5xl sm:font-bold text-center mb-3 sm:mb-10">
        Read our Trending Articles
      </h1>
      <div className="flex items-center justify-center mb-10">
        <input
          type="text"
          name="search"
          className="text-xl sm:text-3xl font-bold w-9/12 sm:w-10/12 border-2 border-[#4dc47d]  rounded-lg ps-10 sm:ps-10 sm:p-2  focus:border-[#4dc47d] focus:border-2"
          placeholder="Search..."
          onChange={handleSearchByName}
        />
      </div>
      <div className="categories flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-1/2">
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("Technology")}
          >
            Technology
          </button>
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("Art")}
          >
            Art
          </button>
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("Lifestyle")}
          >
            Lifestyle
          </button>
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("Nature")}
          >
            Nature
          </button>
        </div>
      </div>
      <div
        className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-16 bg-[#ffffff] p-10"
        style={{ userSelect: "none" }}
      >
        {allPost ? (
          <>
            {allPost.map((data, index) => {
              return (
                <div key={index}>
                  <Card
                    username={data.username}
                    image={data.image}
                    // likes={data.likes.length}
                    avtar={data.userImage}
                    mainUser={isLoggedIn.username}
                    // liked={data.likes.includes(isLoggedIn.username)}
                    postid={data.blog_id}
                    title={data.title}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Category;