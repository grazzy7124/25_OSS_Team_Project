// components/App/Detail.js
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import onePic from "../../image/pic.png"; 
import "../../css/Detail.css";

const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Main 또는 Edit에서 넘어온 state가 있으면 우선 사용
  const [data, setData] = React.useState(location.state ?? null);
  const [loading, setLoading] = React.useState(!location.state);
  const [error, setError] = React.useState(null);

  // 새로고침 시 state가 사라질 수 있으므로 API로 재요청
  React.useEffect(() => {
    if (data) return;
    setLoading(true);
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("API 요청 실패:", err);
        setError("데이터를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [id, data]);

  if (loading)
    return (
      <div className="container mt-4" aria-live="polite">
        불러오는 중...
      </div>
    );
  if (error)
    return (
      <div className="container mt-4 text-danger" role="alert" aria-live="assertive">
        {error}
      </div>
    );
  if (!data) return null;

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "800px" }}
      role="region"
      aria-label={`${data.name || "제품"} 상세 정보 페이지`}
    >
      {/* 상단 버튼 영역 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-light"
          onClick={() => navigate(-1)}
          onKeyDown={(e) => e.key === "Enter" && navigate(-1)}
          aria-label="이전 페이지로 돌아가기"
        >
          ← Back
        </button>

        <button
          className="btn btn-light"
          onClick={() => navigate(`/edit/${id}`, { state: data })}
          onKeyDown={(e) =>
            e.key === "Enter" && navigate(`/edit/${id}`, { state: data })
          }
          aria-label={`${data.name} 수정 페이지로 이동`}
        >
          Edit
        </button>
      </div>

      {/* 상세 정보 영역 */}
      <div className="detailPage" aria-labelledby="detail-title" role="region">
        <h3 id="detail-title" className="detail-title" tabIndex={0}>
          {data.name}
        </h3>

        <div className="mb-3" aria-label="제품 회사 정보">
          <label htmlFor="company-info" className="fw-bold">
            회사
          </label>
          <p id="company-info" className="detail-component">
            {data.company || "정보 없음"}
          </p>
        </div>

        <div className="mb-3" aria-label="제품 고유 ID">
          <label htmlFor="id-info" className="fw-bold">
            ID
          </label>
          <p id="id-info" className="detail-component">
            {data.id}
          </p>
        </div>

        <div className="mb-3" aria-label="제품 추가 날짜">
          <label htmlFor="add-date" className="fw-bold">
            추가 날짜
          </label>
          <p id="add-date" className="detail-component">
            {data.addDate || "-"}
          </p>
        </div>

        <div className="mb-3" aria-label="제품 수정 날짜">
          <label htmlFor="revise-date" className="fw-bold">
            수정 날짜
          </label>
          <p id="revise-date" className="detail-component">
            {data.reviseDate || "-"}
          </p>
        </div>

        <div className="mb-3" aria-label="제품 표준 코드">
          <label htmlFor="std-code" className="fw-bold">
            표준 코드
          </label>
          <div className="detail-component">
            <p
              id="std-code"
              className="text-wrap"
              style={{ wordBreak: "break-all" }}
            >
              {data.stdCode || "없음"}
            </p>
          </div>
        </div>

        {/* 📸 제품 이미지 */}
        <div
          className="mt-4 text-center"
          role="region"
          aria-label="제품 이미지 섹션"
        >
          <img
            src={data.imageUrl || onePic}
            alt={`${data.name} 제품 이미지`}
            style={{
              maxWidth: "400px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />
          <p className="text-muted mt-2" aria-label="이미지 설명 텍스트">
            {data.imageUrl ? "등록된 제품 이미지." : "이미지 준비중입니다."}
          </p>
        </div>

        {/* 🎥 제품 동영상 */}
        <div
          className="ratio ratio-16x9 my-4 mx-auto"
          style={{ maxWidth: "800px" }}
          role="region"
          aria-label="제품 동영상 섹션"
        >
          {data.videoUrl ? (
            <iframe
              src={data.videoUrl}
              title={`${data.name} 영상`}
              allowFullScreen
              aria-label="제품 동영상 미리보기"
            ></iframe>
          ) : (
            <p className="text-muted text-center mt-3" aria-live="polite">
              등록된 영상이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
