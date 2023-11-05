import { NameSort, PrioritySort } from "./sortingUtils";
const PriorityUpdateRedux = (
  source,
  destination,
  tickets,
  content,
  grouping,
  dispatch,
  DefineTickets,
  updateContent
) => {
  let finalContent = {};
  Object.assign(finalContent, content);
  let newTickets = tickets?.length > 0 ? [...tickets] : [];

  let addIndex =
    finalContent[destination.droppableId]?.length > 0
      ? [...finalContent[destination.droppableId]]
      : [];

  let currAddIndex = { ...finalContent[source.droppableId][source.index] };
  currAddIndex.priority = destination.droppableId;
  addIndex.push(currAddIndex);

  const reqId = finalContent[source.droppableId][source.index].id;
  newTickets = newTickets.map((ticket) => {
    let newTicket = { ...ticket };
    if (newTicket.id === reqId) {
      newTicket.priority = destination.droppableId;
    }
    return newTicket;
  });

  addIndex.sort(grouping ? PrioritySort : NameSort);

  finalContent[destination.droppableId] = addIndex;

  let removeIndex = [...finalContent[source.droppableId]];
  removeIndex.splice(source.index, 1);

  removeIndex.sort(grouping ? PrioritySort : NameSort);

  finalContent[source.droppableId] = removeIndex;

  dispatch(DefineTickets(newTickets));
  dispatch(updateContent(finalContent));
};
const StatusUpdateRedux = (
  source,
  destination,
  tickets,
  content,
  status,
  grouping,
  dispatch,
  DefineTickets,
  updateContent
) => {
  let finalContent = {};
  Object.assign(finalContent, content);

  let newTickets = tickets?.length > 0 ? [...tickets] : [];

  let addIndex =
    finalContent[destination.droppableId]?.length > 0
      ? [...finalContent[destination.droppableId]]
      : [];

  let currAddIndex = { ...finalContent[source.droppableId][source.index] };
  currAddIndex.status = destination.droppableId;
  addIndex.push(currAddIndex);

  const reqId = finalContent[source.droppableId][source.index].id;
  newTickets = newTickets.map((ticket) => {
    let newTicket = { ...ticket };
    if (newTicket.id === reqId) {
      newTicket.status = destination.droppableId;
    }
    return newTicket;
  });

  addIndex.sort(grouping ? PrioritySort : NameSort);

  finalContent[destination.droppableId] = addIndex;

  let removeIndex = [...finalContent[source.droppableId]];
  removeIndex.splice(source.index, 1);

  removeIndex.sort(grouping ? PrioritySort : NameSort);

  finalContent[source.droppableId] = removeIndex;

  dispatch(DefineTickets(newTickets));
  dispatch(updateContent(finalContent));
};

const UserUpdateRedux = (
  source,
  destination,
  tickets,
  content,
  grouping,
  dispatch,
  DefineTickets,
  updateContent
) => {
  let finalContent = {};
  Object.assign(finalContent, content);

  let newTickets = tickets?.length > 0 ? [...tickets] : [];

  let addIndex =
    finalContent[destination.droppableId].tickets?.length > 0
      ? [...finalContent[destination.droppableId].tickets]
      : [];

  let currAddIndex = {
    ...finalContent[source.droppableId].tickets[source.index],
  };
  currAddIndex.userId = finalContent[destination.droppableId]?.id;
  addIndex.push(currAddIndex);

  const reqId = finalContent[source.droppableId].tickets[source.index].id;
  const desId = finalContent[destination.droppableId]?.id;

  newTickets = newTickets.map((ticket) => {
    let newTicket = { ...ticket };
    if (newTicket.id === reqId) {
      newTicket.userId = desId;
    }
    return newTicket;
  });

  addIndex.sort(grouping ? PrioritySort : NameSort);

  let newBoardIdx = { ...finalContent[destination.droppableId] };
  newBoardIdx.tickets = addIndex;
  finalContent[destination.droppableId] = newBoardIdx;

  let removeIndex = [...finalContent[source.droppableId].tickets];
  removeIndex = removeIndex.filter((ticket) => ticket.id !== currAddIndex.id);

  removeIndex.sort(grouping ? PrioritySort : NameSort);

  let newBoardId = { ...finalContent[source.droppableId] };
  newBoardId.tickets = removeIndex;
  finalContent[source.droppableId] = newBoardId;

  //updateContent
  dispatch(DefineTickets(newTickets));
  dispatch(updateContent(finalContent));
};

export { PriorityUpdateRedux, StatusUpdateRedux, UserUpdateRedux };
