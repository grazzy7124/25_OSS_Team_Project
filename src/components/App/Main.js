import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import iyagiLogo from "../../image/iyagi-logo.png";
import "../../css/Main.css";

const Main = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setMedicines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API 요청 실패:", err);
        setLoading(false);
      });
  }, []);

  const confirmDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setMedicines((prev) => prev.filter((item) => item.id !== id));
        alert("삭제되었습니다!");
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("오류가 발생했습니다.");
      }
    }
  };

  const filtered = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>불러오는 중...</p>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <img
              src={iyagiLogo}
              alt="이약이 로고 (홈으로 이동)"
              tabIndex={0}
              style={{ width: "160px", height: "auto", cursor: "pointer" }}
              onClick={() => navigate("/")}
              onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            />
          </div>

          <div className="col-9 d-flex align-items-center">
            <input
              placeholder="검색"
              aria-label="의약품 검색 입력창"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
            <button
              className="btn btn-outline-secondary ms-2"
              aria-label="로그인 페이지로 이동"
              onKeyDown={(e) => e.key === "Enter" && alert("로그인 페이지로 이동")}
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </button>

            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => navigate("/add")}
              onKeyDown={(e) => e.key === "Enter" && navigate("/add")}
              aria-label="새 약 정보 추가 페이지로 이동"
            >
              Add
            </button>
          </div>
        </div>

        <div className="row mt-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="col-12 col-md-6 col-lg-3 mb-4"
              role="region"
              aria-label={`${item.name} 약 정보 카드`}
            >
              <div className="component">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={item.videoUrl}
                    title={`${item.name} 영상`}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="fw-bold" aria-label={`제품명: ${item.name}`}>
                    {item.name}
                  </p>

                  <div className="btn-group-sm" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        navigate(`/detail/${item.id}`, { state: item })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        navigate(`/detail/${item.id}`, { state: item })
                      }
                      aria-label={`${item.name} 자세히 보기`}
                    >
                      자세히
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => confirmDelete(item.id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && confirmDelete(item.id)
                      }
                      aria-label={`${item.name} 삭제하기`}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <small className="text-muted" aria-label={`제조사: ${item.company}`}>
                  {item.company}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
