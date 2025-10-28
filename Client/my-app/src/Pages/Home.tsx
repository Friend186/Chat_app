import Footer from "../component/Footer";
import Header  from "../component/Header";
import { useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();
    return(
    <div>
        <Header/>
            <div className="h-[87vh] w-screen ">
                <h1 className="text-3xl font-bold underline">Home Page</h1>
                <h1 className="text-3xl font-bold underline" onClick={() => navigate("/login")}>
                    SigninPage
                </h1>
                <h1>
                    <span className="text-3xl font-bold underline" onClick={() => navigate("/signup")}>
                        SignupPage
                    </span>
                </h1>
            </div>
         <Footer/>
    </div>
    );
}
export default Home;