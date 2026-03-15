export default function LobbyRoster({users}){
    
    return(
        
        <div className="w-[45vw]  border-2 bg-[#172433] overflow-hidden h-fit mr-5 flex flex-col gap-4 border-t rounded-3xl">
            <p className="text-lg font-bold text-[#a3a9bb] pt-3 px-4">SQUAD ROSTER {users.length}/5</p> 
            <div className="grid grid-cols-3 px-4 gap-5">
                {users.map((data,idx)=>(
                    <div key={idx} className="border-2 rounded-2xl shadow-[#23de98] shadow-lg border-[#23de98] aspect-square flex flex-col justify-between p-2 items-center">
                        <span>🍍</span>
                        <span className="text-white">{data}</span>
                        <button className="bg-[#23de98] w-[90%] p-1">Ready</button>
                    </div>
                ))}
                
                
            </div>
            <div className="flex flex-col items-center bg-[#22252a]">
                <p>Waiting for squad to ready up</p>
                <p>1/32</p>
            </div>
        </div>
    )
}