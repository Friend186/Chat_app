import Footer from "../component/Footer";
import Header  from "../component/Header";
import Chat from "../Pages/Chat";
import {  useState,useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../API/user";
import { AuthContext } from "./App";
interface Friend{
    name: string;
    _id: string;
}
function Mainlayout() {
    const {user} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [curentChat, setCurrentChat] = useState(0);
    const [namelist, setNamelist] = useState<Friend[]>([]);
    const handleClick = (index: number) => {
      setCurrentChat(index);
    };
    const { data } = useQuery({
      queryKey: ['namelist'],
      queryFn: fetchUser,
    });

    useEffect(() => {
        const names: Friend[] = [];
        if (data && user) {
            for (const item of data as Friend[]) {
                names.push({ name: item.name, _id: item._id});
            }
        }
        setNamelist(names);
    }, [data,user]);

    return (
        <div className="w-screen h-screen">
            <Header/>
            <div className="flex flex-row h-[87vh] w-screen gap-[6vh] p-[2vw] bg-gray-200">
                {/* Left column for friends list */}
                <div className="flex flex-col w-1/6 bg-white rounded-2xl p-5 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-2">Friends</h1>
                    <ul className="space-y-2 p-2 mt-0 ml-[1vh] overflow-y-auto hide-scrollbar">
                        {namelist.map((friend, index) => (
                            <li
                                key={friend._id}
                                className={`p-2 rounded-lg cursor-pointer ${
                                    index === curentChat ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                                onClick={() => handleClick(index)}
                            >
                                {friend.name}
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

