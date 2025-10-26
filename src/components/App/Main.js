import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import iyagiLogo from "../../image/iyagi-logo.png";
import "../../css/Main.css";

const Main = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name"); // ✅ 정렬 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

  // 로그인 상태 확인
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsLoggedIn(auth === "true");
  }, []);

  // API 데이터 불러오기
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

  // 삭제 기능
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

  // 검색 필터
  const filtered = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ 정렬 로직
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name, "ko");
    if (sortBy === "company") return a.company.localeCompare(b.company, "ko");
    if (sortBy === "addDate") return (a.addDate || "").localeCompare(b.addDate || "");
    return 0;
  });

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className="container">
      {/* 헤더 */}
      <div className="row align-items-center">
        <div className="col-3">
          <img
            src={iyagiLogo}
            alt="이약이 로고 (홈으로 이동)"
            tabIndex={0}
            style={{ width: "200px", height: "auto", cursor: "pointer" }}
            onClick={() => navigate("/")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          />
        </div>

        <div className="col-9 d-flex align-items-center justify-content-end">
          {/* 검색창 */}
          <input
            placeholder="검색"
            aria-label="의약품 검색 입력창"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control me-2"
            style={{ maxWidth: "250px" }}
          />

          {/* ✅ 정렬 선택 */}
          <select
            aria-label="정렬 기준 선택"
            className="form-select me-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: "140px",
              borderRadius: "25px",
              border: "1.5px solid #a2d2ff",
              backgroundColor: "#f8fbff",
              fontSize: "14px",
              padding: "0.45rem 0.6rem",
            }}
          >
            <option value="name">이름순</option>
            <option value="company">회사순</option>
            <option value="addDate">추가날짜순</option>
          </select>

          {/* 로그인 / 로그아웃 */}
          {isLoggedIn ? (
            <button
              className="btn btn-outline-secondary me-2"
              aria-label="로그아웃"
              onClick={() => {
                localStorage.setItem("auth", "false");
                setIsLoggedIn(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-outline-secondary me-2"
              aria-label="로그인 페이지로 이동"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* 로그인 상태일 때만 Add 표시 */}
          {isLoggedIn && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/add")}
              aria-label="새 약 정보 추가 페이지로 이동"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* 약 목록 */}
      <div className="row mt-4">
        {sorted.map((item) => (
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
                    aria-label={`${item.name} 자세히 보기`}
                  >
                    자세히
                  </button>

                  {isLoggedIn && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => confirmDelete(item.id)}
                      aria-label={`${item.name} 삭제하기`}
                    >
                      삭제
                    </button>
                  )}
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
  );
};

export default Main;
