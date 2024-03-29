import './App.css';
import Diary from "./pages/Diary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import React, {useEffect, useReducer, useRef} from "react";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE": {
            const newItem = {
                ...action.data
            };
            newState = [newItem, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((item) => item.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.map((item) => item.id === action.data.id ? {...action.data} : item);
            break;
        }
        default:
            return state;
    }
    localStorage.setItem("diary", JSON.stringify(newState));
    return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        const localData = localStorage.getItem("diary");
        if (localData) {
            const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));

            if (diaryList.length >= 1) {
                dataId.current = parseInt(diaryList[0].id + 1);
                dispatch({
                        type: "INIT",
                        data: diaryList
                    }
                );
            }
        }
    }, []);

    // dispatches
    const dataId = useRef(0);

    const onCreate = (date, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };

    const onRemove = (targetId) => {
        dispatch({
            type: "REMOVE",
            targetId,
        });
    };

    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };

  return (
      <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider value={{
              onCreate, onEdit, onRemove
          }}>
              <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/diary/:id" element={<Diary />}/>
                        <Route path="/edit/:id" element={<Edit />}/>
                        <Route path="/new" element={<New />}/>
                    </Routes>
                </div>
              </BrowserRouter>
          </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
  );
}

export default App;
