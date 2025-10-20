// components/App/Add.js
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

export default function Add() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    stdCode: "",
    videoUrl: "",
    addDate: "",
    reviseDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, formData);
      alert("새 항목이 추가되었습니다!");
      navigate("/");
    } catch (err) {
      console.error("추가 실패:", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">새 항목 추가</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">이름</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="제품명 입력"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">회사</label>
          <input
            type="text"
            name="company"
            className="form-control"
            placeholder="제조사 입력"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">표준 코드</label>
          <textarea
            name="stdCode"
            className="form-control"
            rows={2}
            placeholder="표준 코드 입력"
            value={formData.stdCode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">동영상 URL</label>
          <input
            type="url"
            name="videoUrl"
            className="form-control"
            placeholder="https://..."
            value={formData.videoUrl}
            onChange={handleChange}
            required
          />
          <div className="form-text">유튜브 링크를 입력하세요.</div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>추가 날짜</label>
            <input
              type="date"
              name="addDate"
              className="form-control"
              value={formData.addDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>수정 날짜</label>
            <input
              type="date"
              name="reviseDate"
              className="form-control"
              value={formData.reviseDate}
              onChange={handleChange}
            />
          </div>
        </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    저장
                </button>

                <button type="button" className="btn btn-outline-secondary" onClick={()=>navigate(-1)}>
                    취소
                </button>
            </div>
        </form>
    </div>
  );
}
