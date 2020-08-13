import React, { useState, useEffect } from "react";
import ActivityModal from "./activityModal";
import userImg from "./userImg.png";

export default function User(props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.getElementsByTagName("body")[0].style.background = "black";
      document.getElementsByClassName("header")[0].style.background = "black";
    } else {
      document.getElementsByTagName("body")[0].style.background = "white";
      document.getElementsByClassName("header")[0].style.background = "teal";
    }
  }, [showModal]);

  return (
    <>
      <div className="user" onClick={() => setShowModal(true)}>
        <img src={userImg} alt="user-icon" />
        {` ${props.user.real_name}`}
      </div>

      {showModal && (
        <ActivityModal
          name={props.user.real_name}
          setShowModal={setShowModal}
          activityPeriod={props.user.activity_periods}
        />
      )}
    </>
  );
}
