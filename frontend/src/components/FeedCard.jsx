export default function FeedCard({card}){
    let {username,gameName,mode,rank}=card;
    return (
        <div className="w-[90%] aspect-square p-4 m-4 bg-[#192037] flex flex-col justify-evenly gap-1  rounded-2xl border-2 border-[#76719f]">
            <p>{username}</p>
            <p>{gameName}</p>
            <p>{mode}</p>
            <p>{rank}</p>
            <div className="flex justify-center bg-[#0ab07a] px-1 text-lg text-black">
                <button className="w-full">Join</button>
            </div>
        </div>
    )
    
}