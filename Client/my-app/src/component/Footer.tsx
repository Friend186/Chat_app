import { useNavigate } from "react-router-dom";
function Footer() {
    const navigate = useNavigate();
    return (
      <div className="h-[6vh]">
        <nav>
          <div className="flex flex-row justify-evenly bg-gray-400 p-4">
            <div className="flex flex-col items-center cursor-pointer ">
              <svg
                onClick={() => navigate("/")}
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
                  d="M3 9.75L12 3l9 6.75v10.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20.25V9.75z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21V12h6v9"
                />
              </svg>
              <h2 className="text-sm">Home</h2>
            </div>
            <div className="flex flex-col items-center cursor-pointer ">
              <svg
               onClick={() => navigate("/mainlayout")}
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
                  d="M8.25 8.25h7.5M8.25 12h7.5m-7.5 3.75h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-sm">Chats</h2>
            </div>
            <div className="flex flex-col items-center cursor-pointer ">
              <svg
               onClick={() => navigate("/setting")}
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h2 className="text-sm">Settings</h2>
            </div>
            <div className="flex flex-col items-center cursor-pointer ">
              <svg
               onClick={() => navigate("/profile")}
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
                  d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5a8.25 8.25 0 0115 0"
                />
              </svg>
              <h2 className="text-sm">Profile</h2>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
  export default Footer;