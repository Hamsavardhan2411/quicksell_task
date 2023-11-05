import React, { useEffect } from "react";
import "../styles/board.css";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
export const avatarList = [
  "signal_cellular_null",
  "signal_cellular_1_bar",
  "signal_cellular_3_bar",
  "signal_cellular_4_bar",
  "release_alert",
];
let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

export default function Board({
  status,
  user,
  header,
  index: id,
  content,
  priority,
  grouping,
  tickets,
  users
}) {
  const [cardList, setCardList] = React.useState([]);
  useEffect(() => {
    const filterType = user ? "user" : status ? "status" : "priority";
    switch (filterType) {
      case "user":
        setCardList(content[header]?.tickets);
        break;
      case "status":
        setCardList(content[header]);
        break;
      default:
        setCardList(content[header]);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user, priority, tickets, users, content, grouping]);

  return (
    <div className="board" key={id}>
      <div className="header">
        <div>
          <p className="header_title">
            {user || status ? (
              header
            ) : (
              <div className="header_title">
                <span class="material-symbols-outlined">
                  {avatarList[header]} {/**google fonts*/}
                </span>
                <span class="header_main_title">{priorityList[header]}</span>
              </div>
            )}
            <span className="number">
              {cardList?.length > 0 ? cardList.length : 0}
            </span>
          </p>
        </div>
        <div>
          <span class="material-symbols-outlined">add</span> {/**google fonts*/}
          <span class="material-symbols-outlined">more_horiz</span>{" "}
          {/**google fonts*/}
        </div>
      </div>
      <Droppable droppableId={header}>
        {(provided) => (
          <div
            className="header_cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cardList?.map((ticket, index) => {
              const userIndex = ticket.id;
              const finalIndex = userIndex.split("-")[1];
              return (
                <Card
                  index={index}
                  ticket={ticket}
                  finalIndex={finalIndex}
                  users={users}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
