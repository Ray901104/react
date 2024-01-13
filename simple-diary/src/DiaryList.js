import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList, onEdit, onRemove}) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((item) => (
                    // <div key={item.id}>
                    //     <div>작성자 : {item.author}</div>
                    //     <div>일기 : {item.content}</div>
                    //     <div>감정 : {item.emotion}</div>
                    //     <div>작성 시간(ms) : {item.created_date}</div>
                    // </div>
                    <DiaryItem key={item.id} {...item} onEdit={onEdit} onRemove={onRemove} />
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
