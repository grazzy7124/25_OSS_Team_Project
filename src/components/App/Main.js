import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const filtered = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>불러오는 중...</p>;

  return (
    <>
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col-3">
              <p>장애인 의약품 안전사용 정보(음성, 수어 영상)</p>
            </div>
            <div className="col-9 d-flex">
              <input
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
              />
              <button className="btn btn-outline-secondary ms-2">
                {/* <i className="fas fa-search"></i> */}
                Search
              </button>
              <div className="">
                <button className="btn btn-outline-secondary ms-2">Add</button>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="col-12 col-md-6 col-lg-3 mb-4"
              >
                <div className="ratio ratio-16x9">
                  <iframe
                    src={item.videoUrl}
                    title={item.name}
                    allowFullScreen
                  ></iframe>
                </div >
                <div className="d-flex justify-content-between">
                  <p className="mt-2 fw-bold">{item.name}</p>
                  <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={()=> navigate(`/detail/${item.id}`, {state: item})}
                  >
                    detail
                  </button>
                </div>
                
                <small className="text-muted">{item.company}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

