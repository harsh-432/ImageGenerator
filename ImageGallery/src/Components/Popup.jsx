import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { stateContext } from "../Context/StateContextProvider";

function Popup() {
  const { setShow, data, setScroll } = useContext(stateContext);

  const download = async (l) => {
    try {
      const temp = l;

      const blob = await fetch(temp)
        .then((res) => res.arrayBuffer())
        .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "image.jpeg"; //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log(e);
      console.error("Unable to download image...");
    }
  };

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        setShow(false);
        setScroll(true);
      }}
      className="fixed overflow-auto p-6 backdrop-blur-sm top-0 left-0 z-20 w-full h-full bg-black/60 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" rounded-lg z-50  "
      >
        <div className="relative w-full  md:h-[80vh]">
          <div className=" flex flex-col h-full ">
            <img
              className="h-full "
              src={data.urls.full}
              alt={data.alt_description}
            />
          </div>
          <div className="absolute flex w-full bottom-0 px-4 pb-4  text-white justify-between">
            <button
              onClick={() => {
                download(data.urls.full);
              }}
              className="bg-green-500 px-6 rounded-sm flex gap-2 items-center  py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span>Download</span>
            </button>
          </div>
          <div
            onClick={() => {
              setShow(false);
              setScroll(true);
            }}
            className="w-[40px]  h-[40px] flex items-center justify-center drop-shadow-lg hover:text-white hover:bg-red-400 rounded-full absolute top-0 right-0 bg-white translate-x-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex bg-white  mb-4  justify-between px-3 py-2  ">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full "
              src={data.user.profile_image.large}
            ></img>
            <div className="flex flex-col ">
              <div>{data.user.first_name + " " + data.user.last_name}</div>
              <span className="font-normal sm:w-full w-[100px] overflow-hidden text-gray-400">
                {"@" +
                  (data.user.social.instagram_username
                    ? data.user.social.instagram_username
                    : data.user.first_name)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>

            <span>{data.likes}</span>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Popup;
