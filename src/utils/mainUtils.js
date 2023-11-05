import { NameSort, PrioritySort } from "./sortingUtils";

const SetPriority = (
  tickets,
  users,
  grouping,
  dispatch,
  updateBoard,
  updateData,
  setPriorityBoard
) => {
  const finalContent = {},
    finalHeader = [];
  tickets.forEach((ticket) => {
    const userIndex = ticket.userId[ticket.userId.length - 1];
    let updatedContent =
      finalContent[ticket.priority]?.length > 0
        ? [...finalContent[ticket.priority]]
        : [];
    if (!finalHeader.includes(ticket.priority)) {
      finalHeader.push(ticket.priority);
      finalHeader.sort((a, b) => b - a);
    }
    updatedContent.push({
      ...ticket,
      user: users[userIndex],
    });
    updatedContent.sort(grouping ? PrioritySort : NameSort);

    finalContent[ticket.priority] = updatedContent;
  });
  if (!localStorage.getItem("priorityBoard")) {
    setPriorityBoard(finalHeader);
    localStorage.setItem("priorityBoard", JSON.stringify(finalHeader));
  }
  dispatch(updateBoard(finalHeader));
  dispatch(updateData(finalContent));
};
const SetStatus = (
  tickets,
  users,
  grouping,
  dispatch,
  updateBoard,
  updateData,
  setStatusBoard
) => {
  const finalContent = {},
    finalHeader = [];
  tickets.forEach((ticket) => {
    const userIndex = ticket.userId[ticket.userId.length - 1];
    let updatedContent =
      finalContent[ticket.status]?.length > 0
        ? [...finalContent[ticket.status]]
        : [];
    if (!finalHeader.includes(ticket.status)) {
      finalHeader.push(ticket.status);
    }
    updatedContent.push({
      ...ticket,
      user: users[userIndex],
    });
    updatedContent.sort(grouping ? PrioritySort : NameSort);

    finalContent[ticket.status] = updatedContent;
  });
  if (!localStorage.getItem("statusBoard")) {
    setStatusBoard(finalHeader);
    localStorage.setItem("statusBoard", JSON.stringify(finalHeader));
  }
  dispatch(updateBoard(finalHeader));
  dispatch(updateData(finalContent));
};

const SetUser = (
  users,
  tickets,
  grouping,
  setUserBoard,
  dispatch,
  updateBoard,
  updateData
) => {
  const finalContent = {},
    finalHeader = [];

  users.forEach((user) => {
    let userIndex = user.id;
    if (!finalHeader.includes(user.name)) {
      finalHeader.push(user.name);
      finalHeader.sort();

      let finalTicket = tickets.filter((ticket) => ticket.userId === userIndex);
      finalTicket.sort(grouping ? PrioritySort : NameSort);
      finalContent[user.name] = {
        ...user,
        tickets: finalTicket,
      };
    }
  });
  if (!localStorage.getItem("uboard")) {
    setUserBoard(finalHeader);
    localStorage.setItem("uboard", JSON.stringify(finalHeader));
  }
  dispatch(updateBoard(finalHeader));
  dispatch(updateData(finalContent));
};

const PriorityUpdate = (
  tickets,
  users,
  grouping,
  dispatch,
  updateBoard,
  updateData,
  priorityBoard,
  setPriorityBoard
) => {
  const finalContent = {},
    finalHeader = [];
  tickets.forEach((ticket) => {
    const userIndex = ticket.userId[ticket.userId.length - 1];
    let updatedContent =
      finalContent[ticket.priority]?.length > 0
        ? [...finalContent[ticket.priority]]
        : [];
    if (!finalHeader.includes(ticket.priority)) {
      finalHeader.push(ticket.priority);
      finalHeader.sort((a, b) => b - a);
    }
    updatedContent.push({
      ...ticket,
      user: users[userIndex],
    });
    updatedContent.sort(grouping ? PrioritySort : NameSort);

    finalContent[ticket.priority] = updatedContent;
  });
  if (priorityBoard.length === 0) {
    setPriorityBoard(finalHeader);
    localStorage.setItem("priorityBoard", JSON.stringify(finalHeader));
    dispatch(updateBoard(finalHeader));
  } else {
    dispatch(updateBoard(priorityBoard));
  }

  dispatch(updateData(finalContent));
};
const StatusUpdate = (
  tickets,
  users,
  grouping,
  statusBoard,
  setStatusBoard,
  dispatch,
  updateBoard,
  updateData
) => {
  const finalContent = {},
    finalHeader = [];
  tickets.forEach((ticket) => {
    const userIndex = ticket.userId[ticket.userId.length - 1];
    let updatedContent =
      finalContent[ticket.status]?.length > 0
        ? [...finalContent[ticket.status]]
        : [];
    if (!finalHeader.includes(ticket.status)) {
      finalHeader.push(ticket.status);
    }
    updatedContent.push({
      ...ticket,
      user: users[userIndex],
    });
    updatedContent.sort(grouping ? PrioritySort : NameSort);

    finalContent[ticket.status] = updatedContent;
  });
  if (statusBoard.length === 0) {
    setStatusBoard(finalHeader);
    localStorage.setItem("statusBoard", JSON.stringify(finalHeader));
    dispatch(updateBoard(finalHeader));
  } else {
    dispatch(updateBoard(statusBoard));
  }
  dispatch(updateData(finalContent));
};

const UserUpdate = (
  tickets,
  users,
  userBoard,
  grouping,
  setUserBoard,
  dispatch,
  updateBoard,
  updateData
) => {
  const finalContent = {},
    finalHeader = [];

  users.forEach((user) => {
    let userIndex = user.id;
    if (!finalHeader.includes(user.name)) {
      finalHeader.push(user.name);
      finalHeader.sort();

      let finalTicket = tickets.filter((ticket) => ticket.userId === userIndex);
      finalTicket.sort(grouping ? PrioritySort : NameSort);
      finalContent[user.name] = {
        ...user,
        tickets: finalTicket,
      };
    }
  });
  if (userBoard.length === 0) {
    setUserBoard(finalHeader);
    localStorage.setItem("userBoard", JSON.stringify(finalHeader));
    dispatch(updateBoard(finalHeader));
  } else {
    dispatch(updateBoard(userBoard));
  }
  dispatch(updateData(finalContent));
};

export {
  SetPriority,
  SetStatus,
  UserUpdate,
  SetUser,
  PriorityUpdate,
  StatusUpdate,
};
