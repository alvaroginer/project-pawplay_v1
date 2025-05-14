import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
} from "../../types";

import account from "../../imgs/profilePage/account-outline.svg";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import star from "../../imgs/profilePage/star-outline.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import dogUser from "../../imgs/dogUser.jpg";
import "./CreateProfileNew.css";
import { Input } from "../../components/input/Input";
import { useState } from "react";

export const CreateProfileNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    ownerName: "",
    age: "",
    gender: "",
    size: "",
    description: "",
  });
  return (
    <div className="profile-page">
      <div className="profile-page__image-container">
        <img
          src={dogUser}
          alt="Profile picture of the dog"
          className="profile-page__image"
        />
      </div>
      <div className="profile-page__info">
        <div className="profile-page__info_container no-padding-top">
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={account}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Dog's name"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="The name of your dog"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  editable="string"
                />
              </div>
            </div>
          </div>
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={gender}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Breed"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="hole"
                  onChange={(e) =>
                    setFormData({ ...formData, breed: e.target.value })
                  }
                  editable="select"
                  selectData={dogBreedsType}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-page__info_container">
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={medal}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Owner's name"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="Your name"
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                  editable="string"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-page__info_container">
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={ruler}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Age"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="The age of your dog"
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  editable="select"
                  selectData={dogAgeType}
                />
              </div>
            </div>
          </div>
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={star}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Gender"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="Your dog's gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  editable="select"
                  selectData={dogGenderType}
                />
              </div>
            </div>
          </div>
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={timer}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Size"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="Select the size of your dog"
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  editable="select"
                  selectData={dogSizesType}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-page__info_container">
          <div className="event--category">
            <div className="event--category__img">
              <img
                className="event--category__icon"
                src={description}
                alt={`${"Name"} icon`}
              />
            </div>
            <div className="event--category__text">
              <h4 className="category--text__title">{"Description"}</h4>
              <div className="category--text-container">
                <Input
                  placeholder="Description of your dog"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  editable="string"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
