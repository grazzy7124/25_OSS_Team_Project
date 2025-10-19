import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Main에서 넘겨준 state가 있다면 a우선 사용
  const [data, setData] = React.useState(location.state ?? null);

  React.useEffect(() => {
    // 새로고침 시 state가 사라질 수 있으므로 API로 재요청
    if (!data) {
      axios.get(`${API_URL}/${id}`).then((res) => setData(res.data));
    }
  }, [id, data]);

  if (!data) return <p>불러오는 중...</p>;

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between">
            <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <button 
                className="btn btn-light mb-3"
                onClick={()=> navigate(`/edit/${id}`,{state: data})}
            >
                Edit
            </button>
        </div>
        <div className="detailPage">
          <h3 className="detail-title">{data.name}</h3>
          <div className="mb-3">
            <label>회사</label>
            <p className="detail-component">{data.company}</p>
          </div>
          <div className="mb-3">
            <label>id</label>
            <p className="detail-component">{data.id}</p>
          </div>
          <div className="mb-3">
            <label>추가 날짜</label>
            <p className="detail-component">{data.addDate}</p>
          </div>
          <div className="mb-3">
            <label>수정 날짜</label>
            <p className="detail-component">{data.reviseDate}</p>
          </div>
          <div className="mb-3">
            <label>표준 코드</label>
            <div className="detail-component">
              <p className="text-wrap" style={{wordBreak: "break-all"}}>{data.stdCode}</p>
            </div>
          </div>
          
          
          
        </div>
        
        

        <div 
            className="ratio ratio-16x9 my-3"
            style={{maxWidth:"800px"}}
        >
            <iframe src={data.videoUrl} title={data.name} allowFullScreen></iframe>
        </div>

        
    </div>
  );
}
export default Detail;
