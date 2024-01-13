import React, {useEffect, useState} from "react";

const UnmountTest = () => {
    useEffect(() => {
        console.log("Mount!");

        return () => {
            //Unmount 시점에 실행
            console.log("Unmount!");
        };
    }, []);

    return (
        <div>Unmount Testing Component</div>
    )
};

const LifeCycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        console.log("Mount!");
    }, []);

    useEffect(() => {
        console.log("Update");
    });

    useEffect(() => {
        console.log(`count is updated : ${count}`);
        if (count > 5) {
            alert("count가 5를 넘었습니다. 따라서 1로 초기화 합니다.");
            setCount(1);
        }
    }, [count]);

    useEffect(() => {
        console.log(`text is updated : ${text}`);
    }, [text]);

    return (
        <div style={{padding : 20}}>
            <div>
                {count}
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
                <button onClick={toggle}>ON/OFF</button>
                {isVisible && <UnmountTest />}
            </div>
        </div>
    )
};

export default LifeCycle;
