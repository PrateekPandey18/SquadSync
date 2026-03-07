export default function Signupdiv(){
    return(
        <div className="bg-[#040f49] px-10 text-white text-sm pt-10 pb-8 border-6 border-[#8b9bc4] rounded-2xl">
            <h2 className="font-extrabold text-2xl mb-4 text-center"><span className="text-[#a8eefd]">Squad</span><span className="text-[#307bfc]">Sync</span></h2>
            <div className="flex flex-col h-50 justify-evenly">
                <div>
                    <label htmlFor="Username">Username</label><br />
                    <input type="text" name="Username" id="" className="border-2 border-[#6480c4] w-50"/>
                </div>
                <div>
                    <label htmlFor="Email">Email</label><br />
                <input type="text" name="Email" id="" className="border-2 border-[#6480c4] w-50"/>
                </div>
                <div>
                    <label htmlFor="Password">Password</label><br />
                <input type="text" name="Password" id="" className="border-2 border-[#6480c4] w-50"/>
                </div>
                
                
                <button className="bg-[#2e3ed1] p-1 w-50 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] border-2 border-[#6480c4]">Signup</button>
            </div>
            
            
        </div>
    )
}