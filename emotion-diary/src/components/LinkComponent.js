import {Link} from "react-router-dom";

const LinkComponent = () => {
    return (
        <>
            <Link to="/">메인</Link>
            <br/>
            <Link to="/new">작성</Link>
            <br/>
            <Link to="diary/:id">상세</Link>
            <br/>
            <Link to="/edit">수정</Link>
        </>
    )
}

export default LinkComponent;
