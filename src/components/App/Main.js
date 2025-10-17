


const Main = ({medicines = [], handleEdit, handleDelete}) => {
    return (
        <>
        <div className="container">
            <div className="">
                <div className="row">
                    <div className="col-3">
                        <p>장애인 의약품 안전사용 정보(음성,수어 영상)</p>
                    </div>
                    <div className="col-9">
                        <input placeholder="검색"/>
                        <button>
                            <i className="fas fa-bell" ></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/zPmZe353E7A?si=6LlId7uQHQXEl-nu">
                            </iframe>
                            <p>제목</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
            
        </>
    );
};

export default Main;