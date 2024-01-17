import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {useCallback, useEffect, useMemo, useReducer, useRef} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            const created_date = new Date().getTime();
            const newItem = {
                ...action.data,
                created_date,
            }
            return [newItem, ...state];
        }
        case "REMOVE": {
            return state.filter((item) => item.id !== action.targetId);
        }
        case "EDIT": {
            return state.map((item) => item.id === action.targetId ? {...item, content: action.newContent} : item);
        }
        default:
            return state;
    }
};

export const DiaryStateContext = React.createContext(); // data
export const DiaryDispatchContext = React.createContext(); // functions

function App() {
    // const [data, setData] = useState([]);
    const [data, dispatch] = useReducer(reducer, []);

    const dataId = useRef(0);

    const getData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json());

        const initData = res.slice(0, 20).map((item) => {
            return {
                author: item.email,
                content: item.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });
        dispatch({type:"INIT", data:initData});
        // setData(initData);
    }

    useEffect(() => {
        getData().then(r => {});
    }, []);

    const onCreate = useCallback((author, content, emotion) => {
        dispatch({type:"CREATE", data:{author, content, emotion, id: dataId.current,}});
        // const created_date = new Date().getTime();
        // const newItem = {
        //     author,
        //     content,
        //     emotion,
        //     created_date,
        //     id: dataId.current,
        // }
        dataId.current += 1;
        // setData((data) => [newItem, ...data]);
    }, []);

    const onRemove = useCallback((targetId) => {
        dispatch({type:"REMOVE", targetId})
        // setData((data) => data.filter((item) => item.id !== targetId));
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        dispatch({type: "EDIT", targetId, newContent});
        // setData((data) =>
        //     data.map((item) => item.id === targetId ? {...item, content: newContent} : item)
        // );
    }, []);

    const memoizedDispatches = useMemo(() => {
        return {onCreate, onRemove, onEdit}
    }, []);

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((item) => item.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return {goodCount, badCount, goodRatio};
    }, [data.length]); // 더이상 함수가 아니다.

    const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={memoizedDispatches}>
            <div className="App">
                <DiaryEditor />
                <div>전체 일기 : {data.length}</div>
                <div>기분 좋은 일기 갯수 : {goodCount}</div>
                <div>기분 나쁜 일기 갯수 : {badCount}</div>
                <div>기분 좋은 일기 비율 : {goodRatio}</div>
                <DiaryList />
            </div>
        </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
