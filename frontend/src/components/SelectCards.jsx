import { useState } from "react";
import Cards from "./Cards"
export default function SelectCards({items, onClick}){

    let cardId = (id)=>{
        onClick(id);
    }

    return(
            <div className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">
            
            <div className="grid grid-flow-col auto-cols-[calc((100%-1rem)/3)] gap-2 py-2 ">
                {items.map((card) => {
                    return (
                        <div key={card._id} className="snap-center">
                            <Cards image={card.image} title={card.title} onClick={cardId} _id={card._id}/>
                        </div>
                    );
                })}
            </div>
        </div>
    )
    
}