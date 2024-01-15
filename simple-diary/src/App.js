import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

function App() {
    const [data, setData] = useState([]);
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

        setData(initData);
    }

    useEffect(() => {
        getData().then(r => {});
    }, []);

    const onCreate = useCallback((author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        }
        dataId.current += 1;
        setData((data) => [newItem, ...data]);
    }, []);

    const onRemove = (targetId) => {
        const newDiaryList = data.filter((item) => item.id !== targetId);
        setData(newDiaryList);
    };

    const onEdit = (targetId, newContent) => {
        setData(
            data.map((item) => item.id === targetId ? {...item, content: newContent} : item)
        );
    };

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((item) => item.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return {goodCount, badCount, goodRatio};
    }, [data.length]); // 더이상 함수가 아니다.

    const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
        {/*<LifeCycle />*/}
        {/*<OptimizeTest />*/}
        <DiaryEditor onCreate={onCreate} />
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 갯수 : {goodCount}</div>
        <div>기분 나쁜 일기 갯수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
