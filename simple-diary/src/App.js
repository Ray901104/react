import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useRef, useState} from "react";

function App() {
    const [data, setData] = useState([]);
    const dataId = useRef(0);

    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        }
        dataId.current += 1;
        setData([newItem, ...data]);
    };

    const onRemove = (targetId) => {
        const newDiaryList = data.filter((item) => item.id !== targetId);
        setData(newDiaryList);
    }

  return (
    <div className="App">
        <DiaryEditor onCreate={onCreate} />
        <DiaryList onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
