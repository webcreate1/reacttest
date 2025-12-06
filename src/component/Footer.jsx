import { useState, useRef } from "react";

function Footer() {
  const [attach, setAttach] = useState(false);
  const fileInput = useRef(null);
  let handelAttach = () => {
    setAttach((pre) => !pre);
  };

  return (
    <div className="mx-auto flex-col max-w-2xl items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 sticky bottom-0">
      <textarea
        type="text"
        placeholder="Type here"
        className="focus:outline-none w-full  rounded-md resize-none h-auto"
      ></textarea>
      <div className="mx-auto flex justify-between">
        <div className="flex gap-3">
          <div className="relative">
            <button
              onClick={handelAttach}
              className="rounded-xl p-1.5 outline outline-black/5 hover:bg-gray-200 cursor-pointer"
            >
              Attach
            </button>
            <div
              className={`${
                attach ? "" : "hidden"
              } absolute mt-1 bg-white p-3 rounded-xl outline-1 outline-black/5`}
            >
              <input type="file" ref={fileInput} className="hidden" />
              <button
                onClick={() => fileInput.current.click()}
                className="cursor-pointer"
              >
                Image
              </button>
              <button>Document</button>
            </div>
          </div>
          <button className="rounded-xl p-1.5 outline outline-black/5 hover:bg-gray-200 cursor-pointer">
            Search
          </button>
          <button className="rounded-xl p-1.5 outline outline-black/5 hover:bg-gray-200 cursor-pointer">
            Study
          </button>
        </div>
        <div>
          <button className="rounded-xl p-1.5 outline outline-black/5 hover:bg-gray-200 cursor-pointer">
            Speak
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
