export default function RightSidebar(){
    return(
            <div className="flex flex-col w-[20vw] p-3 bg-[#0d131f]  text-white">
                <p className="p-1 text-[19px] font-bold border-b border-[#6480c4]">Filters</p>
                <div className="flex flex-col">
                    <p className="text-white mt-2">Game Selector</p>
                    {/* <SelectCards items={selectionCards} onClick={gameId}/> */}
                </div>
                <div>
                    <div>
                        
                        {/* {selectionCards.map((cards)=>{
                            if(cards.id==currCard){
                               return <GameFilters filters={cards.filters}/>
                            }
                        })} */}
                    </div>
                    
    
                </div>
            </div>
        )
}