import { useAuth } from "../context/AuthContext";
export default function LobbyRoster({users,size,emitReady}){
    const {currentUser} = useAuth()
    const emptySlotsCount = size - users.length;
    const toggleReady = (id,ready) =>{
        if(currentUser.id===id){
            
            emitReady(!ready)
        }
    }

    return(
        
        <div className="w-[45vw]  border-2 bg-[#172433] overflow-hidden h-fit mr-5 flex flex-col gap-4 border-t rounded-3xl">
            <p className="text-lg font-bold text-[#a3a9bb] pt-3 px-4">SQUAD ROSTER {users.length}/{size}</p> 
            <div className="grid grid-cols-3 px-4 gap-5 ">
                {users.map((data,idx)=>(
                    <div key={idx} className={`border-2 rounded-2xl relative aspect-square flex flex-col justify-between p-2 items-center transition-all duration-300 ${!data.online ? 'border-gray-500 shadow-gray-500/40 shadow-md opacity-60' : data.ready  ? 'border-[#23de98] shadow-[#23de98] shadow-lg'   : 'border-red-500 shadow-red-500/50 shadow-lg'}`}>
                        <div 
                            className={`absolute top-3 right-3 w-3 h-3 rounded-full ${!data.online ?  'bg-gray-500': data.ready ?'bg-green-500 shadow-[0_0_8px_#22c55e]' :'bg-red-500 shadow-[0_0_8px_#ef4444]'} `}
                            title={data.online ? "Online" : "Disconnected"}
                        ></div>
                        <span>🍍</span>
                        <span className="text-white">{data.user.username}</span>
                        <button onClick={()=>toggleReady(data.user._id,data.ready)} className={`${ !data.online ? 'bg-gray-500' : data.ready ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'} w-[90%] p-1`}>{!data.online ? 'Offline' : data.ready? "Ready":'Ready-up'}</button>
                    </div>
                ))}
                {Array.from({ length: emptySlotsCount }).map((_, index) => (
                    <div 
                        key={`empty-${index}`} 
                        className="border-2 border-dashed rounded-2xl border-gray-600 aspect-square flex flex-col justify-center items-center opacity-50"
                    >
                        <h1 className="text-gray-400 font-bold animate-pulse">waiting...</h1>
                        
                    </div>
                ))}
                
            </div>
            <div className="flex flex-col items-center bg-[#22252a]">
                <p>Waiting for squad to ready up</p>
                <p>1/{size}</p>
            </div>
        </div>
    )
}