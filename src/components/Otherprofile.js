import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "./Card";
import { useAuth } from "./AuthContext";
import { useCookies } from "react-cookie";

function Otherprofile() {
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(false);
  const [cookie, setCookie] = useCookies(['access', 'refresh'])
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/getotherprofile/${params.username}`, {
        headers: {
          Authorization: "JWT " + cookie.access
        }
      })
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setUserData(res.data);
        } else {
          setUserData(false);
        }
      });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 bg-[#ffffff]">
      {/* Profile Photo and Follow Button */}
      {userData && (
        <>
          <div className="text-center">
            {userData[0] && (
              <>
                <img
                  className="h-32 w-32 rounded-full mx-auto mb-4"
                  src={
                    userData[0].userImage
                  }
                  alt="Profile"
                />
                <h1 className="text-2xl font-semibold">
                  {userData[0].username}
                </h1>
              </>
            )}
          </div>

          {/* Image Upload Section */}
          {userData && (
            <>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Replace with a map function to generate responsive photo cards */}
                  {/* Example card */}
                  {userData.map((post, index) => {
                    return (
                      <Card
                        username={post.username}
                        image={
                          post.image
                        }
                        likes={post.liked_by_users
                          .length}
                        avtar={
                          post.userImage
                        }
                        mainUser={isLoggedIn.username}
                        liked={post.liked_by_users
                          .includes(isLoggedIn.username)}
                        postid={post.blog_id}
                        title={post.title}
                      />
                    );
                  })}
                  {/* End of example card */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Otherprofile;
