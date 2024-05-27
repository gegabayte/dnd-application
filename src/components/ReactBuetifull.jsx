import { FiPlusSquare } from "react-icons/fi";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ReactBuetifull = () => {
    const [cards, setCards] = useState([
        { id: "card-1", content: "" }
    ]);
    const [newCardInput, setNewCardInput] = useState("");

    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        const reorderedCards = Array.from(cards);
        const [removed] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, removed);

        setCards(reorderedCards);
    };

    const handleInputChange = (event, cardId) => {
        const updatedCards = cards.map(card =>
            card.id === cardId ? { ...card, content: event.target.value } : card
        );
        setCards(updatedCards);
    };

    const handleSubmit = () => {
        cards.forEach(card => {
            console.log(card.content);
        });
    };

    const addNewCard = () => {
        const newCard = {
            id: `card-${cards.length + 1}`,
            content: newCardInput
        };
        setCards([...cards, newCard]);
        setNewCardInput("");
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 25, width: 1360 }} >
                            {cards.map((card, index) => (
                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div className="flex justify-between gap-8"
                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ userSelect: "none", padding: 16, margin: "0 0 8px 0", background: snapshot.isDragging ? "lightgreen" : "grey", ...provided.draggableProps.style }} >
                                            <input className="w-full h-12 p-4 rounded-lg" type="text" value={card.content} onChange={event => handleInputChange(event, card.id)} placeholder="Ustun nomi" />
                                            {/* <input className="w-full h-12 p-4 rounded-lg" type="number" value={card.content} onChange={event => handleInputChange(event, card.id)} placeholder="Key" /> */}

                                        </div>

                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="flex justify-between mt-12">
                <button onClick={addNewCard} className="flex items-center gap-2 text-[#5D9AFC]"><FiPlusSquare /> Ustun qo’shish</button>
                <button onClick={handleSubmit} className="bg-[#5D9AFC] text-white w-36 h-12 rounded-lg">Submit</button>
            </div>
        </div>
    );
};

export default ReactBuetifull;
