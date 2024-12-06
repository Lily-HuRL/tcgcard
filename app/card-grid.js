import { useState } from "react";

export default function CardGrid({ cards }) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="border rounded-md p-4 hover:shadow-lg hover:scale-105 flex flex-col items-center cursor-pointer active:scale-95"
            onClick={() => setSelectedCard(card)}
          >
            <img
              src={card.images?.large || "/placeholder.png"}
              alt={card.name}
              className="w-full h-48 object-contain"
            />
            <p className="mt-2 text-center text-lg font-medium">{card.name}</p>
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-75 px-7 py-3 rounded-xl max-w-md w-full relative">
            <button  
              onClick={() => setSelectedCard(null)}
              className="absolute top-2 right-2 text-2xl"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-3">{selectedCard.name}</h1>
            <img
              src={selectedCard.images.large}
              alt={selectedCard.name}
              className="max-w-full h-auto mx-auto mb-3"
            />
            <p className="font-semibold">Set: {selectedCard.set.name}</p>
            {selectedCard.description && (
              <p className="text-gray-700">{selectedCard.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}