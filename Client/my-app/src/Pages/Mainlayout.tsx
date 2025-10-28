import Footer from "../component/Footer";
import Header  from "../component/Header";
import Chat from "../Pages/Chat";
import { useState } from "react";
import {useMutation} from "@tanstack/react-query";

function Mainlayout() {
    const [curentChat, setCurrentChat] = useState(0);
    const namelist = ["","Alice", "Bob", "Charlie", "David" , "Eve",   "Frank", "Grace", "Heidi", "Ivan", "Judy" , "Mallory", "Niaj", "Olivia", "Peggy", "Quentin", "Rupert", "Sybil", "Trent", "Uma", "Victor", "Wendy", "Xander", "Yvonne", "Zack"];
    const handleClick = (index: number) => {
        setCurrentChat(index);
    }

    return (
        <div className="w-screen h-screen">
            <Header/>
            <div className="flex flex-row h-[87vh] w-screen gap-[6vh] p-[2vw] bg-gray-200">
                {/* Left column for friends list */}
                <div className="flex flex-col w-1/6 bg-white rounded-2xl p-5 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-2">Friends</h1>
                    <ul className="space-y-2 p-2 mt-0 ml-[1vh] overflow-y-auto hide-scrollbar">
                        {namelist.map((name, index) => (
                            <li
                                key={index}
                                className={`text-lg cursor-pointer ${index === curentChat ? "font-bold text-blue-500" : ""}`}
                                onClick={() => handleClick(index)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right column for chat box */}
                <div className="flex flex-col w-5/6 bg-white border border-solid rounded-2xl p-5 overflow-hidden">
                    <h1 className="text-2xl font-bold mb-2">
                        {`Chat with ${namelist[curentChat]}`}
                    </h1>
                    <div className="flex flex-row h-full w-full mx-auto overflow-y-auto p-6">
                        <div className="flex flex-row h-full w-full">
                            <Chat index={curentChat} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default Mainlayout;