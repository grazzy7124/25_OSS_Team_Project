import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import iyagiLogo from "../../image/iyagi-logo.png";
import "../../css/Main.css";

const Main = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  const navigate = useNavigate();
  const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";
  const PHARM_API_URL =
    "https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire";

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsLoggedIn(auth === "true");
  }, []);

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

  // ✅ 삭제 기능
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude, longitude });
        },
        (err) => {
          console.error("위치 정보 불러오기 실패:", err);
          setUserLocation({ latitude: 37.5665, longitude: 126.9780 }); // 서울시청 기본값
        }
      );
    } else {
      alert("위치 정보를 지원하지 않는 브라우저입니다.");
      setUserLocation({ latitude: 37.5665, longitude: 126.9780 });
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const fetchPharmacies = async () => {
      try {
        const res = await axios.get(PHARM_API_URL, {
          params: {
            ServiceKey:
              "0e970572f043cbb40c9de5754ee7542f4cf1e423bcfc9cd5857bb496befb4a10",
            WGS84_LON: userLocation.longitude,
            WGS84_LAT: userLocation.latitude,
            numOfRows: 10,
            pageNo: 1,
            _type: "json",
          },
        });

        const items = res.data?.response?.body?.items?.item || [];
        setPharmacies(items);
      } catch (err) {
        console.error("약국 정보 요청 실패:", err);
      }
    };

    fetchPharmacies();
  }, [userLocation]);

  if (loading) return <p>불러오는 중...</p>;

  const filtered = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name, "ko");
    if (sortBy === "company") return a.company.localeCompare(b.company, "ko");
    if (sortBy === "addDate") return (a.addDate || "").localeCompare(b.addDate || "");
    return 0;
  });

  return (
    <div className="container">
      {/* 헤더 */}
      <div className="row align-items-center">
        <div className="col-3">
          <img
            src={iyagiLogo}
            alt="이약이 로고"
            style={{ width: "200px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="col-9 d-flex align-items-center justify-content-end">
          <input
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control me-2"
            style={{ maxWidth: "250px" }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select me-2"
            style={{ width: "140px" }}
          >
            <option value="name">이름순</option>
            <option value="company">회사순</option>
            <option value="addDate">추가날짜순</option>
          </select>

          {isLoggedIn ? (
            <button
              className="btn btn-outline-secondary me-2"
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
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {isLoggedIn && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/add")}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* 약 목록 */}
      <div className="row mt-4">
        {sorted.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="component">
              <div className="ratio ratio-16x9">
                <iframe src={item.videoUrl} title={item.name} allowFullScreen></iframe>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="fw-bold">{item.name}</p>
                <div className="btn-group-sm">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate(`/detail/${item.id}`, { state: item })}
                  >
                    자세히
                  </button>
                  {isLoggedIn && (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => confirmDelete(item.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <small className="text-muted">{item.company}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <h4>📍 내 주변 약국</h4>
        {pharmacies.length === 0 ? (
          <p className="mt-3">주변 약국 정보를 불러오는 중입니다...</p>
        ) : (
          <ul className="mt-3">
            {pharmacies.map((p, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                <strong>{p.dutyName}</strong>
                <br />
                {p.dutyAddr}
                <br />
                ☎ {p.dutyTel1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main;
