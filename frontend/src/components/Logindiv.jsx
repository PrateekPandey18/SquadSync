import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import axios from "axios"
export default function Logindiv(){
    const navigate = useNavigate();
        const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const {setCurrentUser} = useAuth()

      const onSubmit = async (data) => {
        const res = await axios.post("http://localhost:5000/login",data,{withCredentials:true});
        setCurrentUser(res.data)
        navigate(`/homepage`)
      }

    return(
        <div className="bg-[#040f49] px-10 text-white text-sm pt-10 pb-8 border-6 border-[#8b9bc4] rounded-2xl">
            <h2 className="font-extrabold text-2xl mb-4 text-center"><span className="text-[#a8eefd]">Squad</span><span className="text-[#307bfc]">Sync</span></h2>
            <div className="flex flex-col h-50 justify-evenly">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="Username">Username</label><br />
                        <input type="text" name="Username" id="" className="border-2 border-[#6480c4] w-50" {...register("username")} />
                    </div>
                    
                    <div>
                        <label htmlFor="Password">Password</label><br />
                    <input type="text" name="Password" id="" className="border-2 border-[#6480c4]  w-50" {...register("password")} />
                    </div>
                    
                    <button type="submit" className="bg-[#2e3ed1] p-1 w-50 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] border-2 border-[#6480c4]">Login</button>
                </form>
            </div>
            
            
        </div>
    )
}