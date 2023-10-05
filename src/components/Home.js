import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useCookies } from "react-cookie";

function Home() {
  const [allPost, setAllPost] = useState([]);
  const { isLoggedIn } = useAuth();
  const [cookies, setCookies] = useCookies(['access', 'refresh'])
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/blogs/", {
      headers: {
        Authorization: "JWT " + cookies.access
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data) {
        setAllPost(res.data);
      } else {
        setAllPost([]);
      }
    });
  }, []);
  return (
    <div
      className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-16 bg-white p-10"
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
                  likes={data.liked_by_users.length}
                  avtar={data.userImage}
                  mainUser={isLoggedIn.username}
                  liked={data.liked_by_users.includes(isLoggedIn.username)}
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
  );
}

export default Home;
