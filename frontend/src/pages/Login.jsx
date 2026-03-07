import loginbg from "../assets/loginbg.png"
import Logindiv from "../components/logindiv"

export default function Login(){
    return(
        <div className="bg-cover bg-center h-screen flex justify-center items-center " style={{ backgroundImage: `url(${loginbg})` }}>
            <Logindiv />
        </div>
    )
}