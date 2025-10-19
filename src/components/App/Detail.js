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
      <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h3>{data.name}</h3>
      <small className="text-muted">{data.company}</small>

      <div className="ratio ratio-16x9 my-3">
        <iframe src={data.videoUrl} title={data.name} allowFullScreen></iframe>
      </div>

      {data.description && <p>{data.description}</p>}
    </div>
  );
}
export default Detail;
