import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import spinner from "../../assets/gg.gif";
import "./avatar.css";
import { Button } from "react-bootstrap";
import { setAvatarAPI } from "../../utils/ApiRequest.js";

const {
  uniqueNamesGenerator,
  colors,
  animals,
  countries,
  names,
  languages,
} = require("unique-names-generator");

const SetAvatar = () => {
  const sprites = [
    "adventurer",
    "micah",
    "avataaars",
    "bottts",
    "initials",
    "adventurer-neutral",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "croodles",
    "identicon",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
    "identicon",
  ];

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedSprite, setSelectedSprite] = React.useState(sprites[0]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const randomName = () => {
    let shortName = uniqueNamesGenerator({
      dictionaries: [animals, colors, countries, names, languages],
      length: 2,
    });
    return shortName;
  };

  const [imgURL, setImgURL] = React.useState([
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
  ]);

  const handleSpriteChange = (e) => {
    setSelectedSprite(() => {
      if (e.target.value.length > 0) {
        setLoading(true);
        const imgData = [];
        for (let i = 0; i < 4; i++) {
          imgData.push(
            `https://api.dicebear.com/7.x/${
              e.target.value
            }/svg?seed=${randomName()}`
          );
        }
        setImgURL(imgData);
        setLoading(false);
      }
      return e.target.value;
    });
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
        image: imgURL[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Avatar selected successfully", toastOptions);
        navigate("/");
      } else {
        toast.error("Error Setting avatar, Please Try again", toastOptions);
      }
    }
  };

  return (
    <>
      <div className="set-avatar-background">
        {loading ? (
          <div className="container containerBox">
            <div className="avatarBox">
              <img src={spinner} alt="Loading" />
            </div>
          </div>
        ) : (
          <div className="container containerBox">
            <div className="avatarBox">
              <h1 className="text-center text-white mt-5">Choose Your Avatar</h1>
              <div className="container">
                <div className="row">
                  {imgURL.map((image, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-6">
                      <img
                        src={image}
                        alt=""
                        className={`avatar ${
                          selectedAvatar === index ? "selected" : ""
                        } img-circle imgAvatar mt-5`}
                        onClick={() => setSelectedAvatar(index)}
                        width="100%"
                        height="auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <select
                onChange={handleSpriteChange}
                className="form-select mt-5"
              >
                {sprites.map((sprite, index) => (
                  <option value={sprite} key={index}>
                    {sprite}
                  </option>
                ))}
              </select>
              <Button
                onClick={setProfilePicture}
                type="submit"
                className="mt-5"
              >
                Set as Profile Picture
              </Button>
            </div>
            <ToastContainer />
          </div>
        )}
      </div>
    </>
  );
};

export default SetAvatar;
