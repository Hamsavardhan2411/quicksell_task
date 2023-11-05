import { useEffect, useState } from "react";
import "./styles/app.css";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { DefineTickets } from "./redux/slice/tickets";
import { DefineUsers } from "./redux/slice/users";
import { updateContent } from "./redux/slice/data";
import { updateHeader } from "./redux/slice/headers";
import Board from "./components/containers/Board";
import AppBar from "./components/containers/AppBar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  PriorityUpdate,
  SetPriority,
  SetStatus,
  SetUser,
  StatusUpdate,
  UserUpdate,
} from "./utils/mainUtils";
import {
  PriorityUpdateRedux,
  StatusUpdateRedux,
  UserUpdateRedux,
} from "./utils/reduxUtils";

function App() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.data);
  const users = useSelector((state) => state.users.data);
  const headers = useSelector((state) => state.headers.data);
  const content = useSelector((state) => state.content.data);
  const [statusFilter, setStatusFilter] = useState(true);
  const [userFilter, setUserFilter] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState(false);
  const [grouping, setGouping] = useState(true);

  const fetchInfo = async () => {
    const response = await fetch(process.env.REACT_APP_URL);
    const data = await response.json();
    dispatch(DefineTickets(data.tickets));
    dispatch(DefineUsers(data.users));
  };

  const [statusBoard, setStatusBoard] = useState(
    localStorage.getItem("statusBoard")
      ? JSON.parse(localStorage.getItem("statusBoard"))
      : []
  );
  const [userBoard, setUserBoard] = useState(
    localStorage.getItem("userBoard")
      ? JSON.parse(localStorage.getItem("userBoard"))
      : []
  );
  const [priorityBoard, setPriorityBoard] = useState(
    localStorage.getItem("priorityBoard")
      ? JSON.parse(localStorage.getItem("priorityBoard"))
      : []
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const filterType = userFilter
      ? "user"
      : statusFilter
      ? "status"
      : "priority";
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    switch (filterType) {
      case "user":
        UserUpdateRedux(
          source,
          destination,
          tickets,
          content,
          grouping,
          dispatch,
          DefineTickets,
          updateContent
        );
        break;
      case "status":
        StatusUpdateRedux(
          source,
          destination,
          tickets,
          content,
          statusFilter,
          grouping,
          dispatch,
          DefineTickets,
          updateContent
        );
        break;
      default:
        PriorityUpdateRedux(
          source,
          destination,
          tickets,
          content,
          grouping,
          dispatch,
          DefineTickets,
          updateContent
        );
        break;
    }
  };

  useEffect(() => {
    if (!tickets.length && !users.length) {
      fetchInfo();
    }
  }, []);
  useEffect(() => {
    const filterType = userFilter
      ? "user"
      : statusFilter
      ? "status"
      : "priority";
    if (!headers.length) {
      if (tickets.length > 0 && users.length > 0) {
        switch (filterType) {
          case "user":
            SetUser(
              users,
              tickets,
              grouping,
              setUserBoard,
              dispatch,
              updateHeader,
              updateContent
            );
            break;
          case "status":
            SetStatus(
              tickets,
              users,
              grouping,
              dispatch,
              updateHeader,
              updateContent,
              setStatusBoard
            );
            break;
          default:
            SetPriority(
              tickets,
              users,
              grouping,
              dispatch,
              updateHeader,
              updateContent,
              setPriorityBoard
            );
            break;
        }
      }
    } else {
      switch (filterType) {
        case "user":
          UserUpdate(
            tickets,
            users,
            userBoard,
            grouping,
            setUserBoard,
            dispatch,
            updateHeader,
            updateContent
          );
          break;
        case "status":
          StatusUpdate(
            tickets,
            users,
            grouping,
            statusBoard,
            setStatusBoard,
            dispatch,
            updateHeader,
            updateContent
          );
          break;
        default:
          PriorityUpdate(
            tickets,
            users,
            grouping,
            dispatch,
            updateHeader,
            updateContent,
            priorityBoard,
            setPriorityBoard
          );
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, userFilter, tickets, users, grouping]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <AppBar />
        <div className="App_filter">
          <div className="filter_title">Display Settings </div>
          <div className="App_dropdown">
            <div className="Dropdown_name1">Group By</div>
            <Dropdown
              options={["Status", "User", "Priority"]}
              value={"Status"}
              placeholder="Grouping"
              className="App_filter_dropdown"
              onChange={(e) => {
                setStatusFilter(false);
                setPriorityFilter(false);
                setUserFilter(false);
                if (e.value === "Status") {
                  setStatusFilter(true);
                }
                if (e.value === "User") {
                  setUserFilter(true);
                }
                if (e.value === "Priority") {
                  setPriorityFilter(true);
                }
              }}
            />
            <div className="Dropdown_name2">Order By</div>
            <Dropdown
              options={["Priority", "Title"]}
              placeholder="Order By"
              value={"Priority"}
              className="App_filter_dropdown"
              onChange={() => {
                setGouping(!grouping);
              }}
            />
          </div>
        </div>
        <div className="app_whole">
          <div className="app_boards">
            {headers.map((header, index) => (
              <Board
                status={statusFilter}
                user={userFilter}
                header={header}
                index={index}
                content={content}
                priority={priorityFilter}
                grouping={grouping}
                tickets={tickets}
                users={users}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
