


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
                            <i class="fas fa-bell" ></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>dddd</p>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    );
};

export default Main;