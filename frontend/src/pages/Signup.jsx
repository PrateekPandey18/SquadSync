import loginbg from "../assets/loginbg.png"
import Signupdiv from "../components/Signupdiv"
export default function Signup(){
    return(
        <div className="bg-cover bg-center h-screen flex justify-center items-center" style={{ backgroundImage: `url(${loginbg})` }}>
            <Signupdiv />
        </div>
    )
}