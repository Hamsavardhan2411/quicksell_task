import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import "../styles/board.css"

export default function Board({ status, user, header, index: id, content }) {
  return (
    <div className="board" key={id}>
      <div className="board__top">
        <div>
          <p className="board__title">
            {header || "Name of Board"}
            <span className="board__number">{user ? content[header]?.tickets?.length : ""}</span>
            <span className="board__number">{status ? content[header]?.length : ""}</span>
          </p>
        </div>
        <div>
          <span class="material-symbols-outlined">add</span>
          <span class="material-symbols-outlined">more_horiz</span>
        </div>
      </div>
      <Droppable droppableId={header}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {user ? (
              <>
                {content[header]?.tickets?.map((ticket, index) => {
                  const userIdx = ticket.id;
                  const idx = userIdx.split("-")[1];
                  return (
                    <Card
                      index={index}
                      ticket={ticket}
                      status={status}
                      user={user}
                      idx={idx}
                    />
                  );
                })}
              </>
            ) : (
              <div></div>
            )}

            {status ? (
              <>
                {content[header]?.map((ticket, index) => {
                  const userIdx = ticket.id;
                  const idx = userIdx.split("-")[1];

                  return (
                    <Card
                      index={index}
                      ticket={ticket}
                      status={status}
                      user={user}
                      idx={idx}
                    />
                  );
                })}
              </>
            ) : (
              <div></div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
