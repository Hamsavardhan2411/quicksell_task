import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../styles/card.css";
import { imagesList } from "../../assets/images";
import { avatarList } from "./Board";
const Card = ({ index, ticket, finalIndex, users }) => {
  return (
    <Draggable key={finalIndex} draggableId={finalIndex} index={index}>
      {(provided) => (
        <div
          className="drag_card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card_content">
            <p>{ticket.id}</p>
            <div className="card_avatars">
              <img
                className="card_avatar"
                src={imagesList[ticket.userId[ticket.userId.length - 1] - 1]}
                alt="avatar"
                title={users[ticket.userId[ticket.userId.length - 1] - 1].name}
              />
              <span
                className="card_status"
                style={{
                  background: users[ticket.userId[ticket.userId.length - 1] - 1]
                    .available
                    ? "#03cc00"
                    : "#8a8a8a",
                }}
              ></span>
            </div>
          </div>
          <div className="card_title">{ticket.title}</div>
          <div className="card_priority">
            <p className="card_p_sign">
              <span class="material-symbols-outlined">
                {avatarList[ticket.priority]}
              </span>
            </p>
            {ticket.tag.map((tag, index) => (
              <p className="card_tags" key={index}>
                <span className="card_circle"></span>
                {tag}
              </p>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
