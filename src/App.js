import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { DefineTickets } from "./redux/slice/tickets";
import { DefineUsers } from "./redux/slice/users";
import { updateContent } from "./redux/slice/data";
import { updateHeader } from "./redux/slice/headers";
import { sorting } from "./utils/sortingUtils";

function App() {
  // Dispatch
  const dispatch = useDispatch();

  // States
  const tickets = useSelector((state) => state.tickets.data);
  const users = useSelector((state) => state.users.data);
  const headers = useSelector((state) => state.headers.data);
  const content = useSelector((state) => state.content.data);

  // Fetch data from API
  const getData = async () => {
    const response = await fetch(process.env.REACT_APP_URL);
    const data = await response.json();
    dispatch(DefineTickets(data.tickets));
    dispatch(DefineUsers(data.users));
  };

  // States
  const [status] = useState(true);
  const [user] = useState(false);
  const [priority] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    if (user) {
      let newData = content;
      // add to destination
      let addIdx = [...newData[destination.droppableId].tickets];
      addIdx.push(newData[source.droppableId].tickets[source.index]);
      addIdx.sort(sorting);
      newData[destination.droppableId].tickets = addIdx;
      // remove from source
      let removeIdx = [...newData[source.droppableId].tickets];
      removeIdx.splice(source.index, 1);
      removeIdx.sort(sorting);
      newData[source.droppableId].tickets = removeIdx;
      //updateData
      dispatch(updateContent(newData));
    }

    if (status) {
      let newData = {};
      Object.assign(newData, content);
      // add to destination
      let addIdx = [...newData[destination.droppableId]];
      addIdx.push(newData[source.droppableId][source.index]);
      addIdx.sort(sorting);
      newData[destination.droppableId] = addIdx;
      // remove from source
      let removeIdx = [...newData[source.droppableId]];
      removeIdx.splice(source.index, 1);
      removeIdx.sort(sorting);
      newData[source.droppableId] = removeIdx;
      //updateData
      dispatch(updateContent(newData));
    }

    // if (priority) {
    // }
  };

  useEffect(() => {
    if (tickets.length === 0 && users.length === 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (tickets.length > 0 && users.length > 0) {
      if (status) {
        const newData = {};
        const newHeader = [];
        tickets.forEach((ticket) => {
          const userIdx = ticket.userId;
          const idx = userIdx.split("-")[1];
          if (!newHeader.includes(ticket.status)) {
            newHeader.push(ticket.status);
            newData[ticket.status] = [
              {
                ...ticket,
                user: users[idx],
              },
            ];
          } else {
            newData[ticket.status] = [
              ...newData[ticket.status],
              {
                ...ticket,
                user: users[idx],
              },
            ].sort(sorting);
          }
        });
        console.log(newData);
        dispatch(updateHeader(newHeader));
        dispatch(updateContent(newData));
      }
      if (user) {
        const newData = {};
        const newHeader = [];

        users.forEach((user) => {
          const userIdx = user.id;
          if (!newHeader.includes(user.name)) {
            newHeader.push(user.name);
            newHeader.sort();

            const newTic = tickets.filter(
              (ticket, index) => ticket.userId === userIdx
            );
            newTic.sort(sorting);
            newData[user.name] = {
              ...user,
              tickets: newTic,
            };
          }
        });
        console.log(newData);
        dispatch(updateHeader(newHeader));
        dispatch(updateContent(newData));
      }
      if (priority) {
      }
    }
  }, [status, user, tickets, users]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        Hii!!
      </div>
    </DragDropContext>
  );
}

export default App;
