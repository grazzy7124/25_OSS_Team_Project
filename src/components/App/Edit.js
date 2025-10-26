// components/App/Edit.js
import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Detail에서 넘어온 state가 있으면 즉시 사용, 없으면 서버에서 재조회
  const [form, setForm] = React.useState(() => {
    const s = location.state;
    return s
      ? {
          name: s.name ?? "",
          company: s.company ?? "",
          stdCode: s.stdCode ?? "",
          videoUrl: s.videoUrl ?? "",
          imageUrl: s.imageUrl ?? "",
          addDate: s.addDate ?? "",
          reviseDate: s.reviseDate ?? "",
        }
      : null;
  });

  const [loading, setLoading] = React.useState(!location.state);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [preview, setPreview] = React.useState(form?.imageUrl || "");

  // 새로고침/직접접근 대비: id로 데이터 가져오기
  React.useEffect(() => {
    if (form) return;
    setLoading(true);
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        const d = res.data;
        setForm({
          name: d.name ?? "",
          company: d.company ?? "",
          stdCode: d.stdCode ?? "",
          videoUrl: d.videoUrl ?? "",
          imageUrl: d.imageUrl ?? "",
          addDate: d.addDate ?? "",
          reviseDate: d.reviseDate ?? "",
        });
        setPreview(d.imageUrl || "");
      })
      .catch(() => setError("데이터를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id, form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "imageUrl") setPreview(value);
  };

  // 로컬 파일 선택 시 미리보기 처리
  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  // 저장
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("이름을 입력하세요.");
    setSaving(true);

    try {
      const today = new Date().toISOString().slice(0, 10);
      const payload = { ...form, reviseDate: today };
      await axios.put(`${API_URL}/${id}`, payload);
      alert("수정이 완료되었습니다!");
      navigate(`/detail/${id}`, { replace: true, state: payload });
    } catch {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form)
    return <div className="container mt-4">불러오는 중...</div>;

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: 720 }}
      role="region"
      aria-label={`${form.name || "제품"} 수정 페이지`}
    >
      {/* 상단 영역 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0" tabIndex={0} aria-label="수정 페이지 제목">
          수정
        </h4>
        <div className="btn-group btn-group-sm">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
            onKeyDown={(e) => e.key === "Enter" && navigate(-1)}
            disabled={saving}
            aria-label="이전 페이지로 돌아가기"
          >
            ← Back
          </button>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger py-2"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} aria-label="제품 정보 수정 폼">
        {/* 이름 */}
        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">
            이름
          </label>
          <input
            id="name-input"
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={onChange}
            placeholder="제품명"
            aria-label="제품 이름 입력창"
          />
        </div>

        {/* 회사 */}
        <div className="mb-3">
          <label htmlFor="company-input" className="form-label">
            회사
          </label>
          <input
            id="company-input"
            type="text"
            name="company"
            className="form-control"
            value={form.company}
            onChange={onChange}
            placeholder="제조사"
            aria-label="제조사 입력창"
          />
        </div>

        {/* 표준 코드 */}
        <div className="mb-3">
          <label htmlFor="stdCode-input" className="form-label">
            표준 코드
          </label>
          <textarea
            id="stdCode-input"
            name="stdCode"
            className="form-control"
            rows={2}
            value={form.stdCode}
            onChange={onChange}
            placeholder="긴 코드도 자동 줄바꿈됩니다"
            style={{ wordBreak: "break-all" }}
            aria-label="표준 코드 입력창"
          />
        </div>

        {/* 동영상 URL */}
        <div className="mb-3">
          <label htmlFor="video-url" className="form-label">
            동영상 URL
          </label>
          <input
            id="video-url"
            type="url"
            name="videoUrl"
            className="form-control"
            value={form.videoUrl}
            onChange={onChange}
            placeholder="https://..."
            aria-label="동영상 URL 입력창"
          />
          <div className="form-text">
            유튜브/임베드 가능한 링크를 입력하세요.
          </div>
        </div>

        {/* 이미지 URL */}
        <div className="mb-3">
          <label htmlFor="image-url" className="form-label">
            이미지 URL
          </label>
          <input
            id="image-url"
            type="url"
            name="imageUrl"
            className="form-control"
            value={form.imageUrl}
            onChange={onChange}
            placeholder="https://이미지주소.jpg"
            aria-label="제품 이미지 URL 입력창"
          />
          <div className="form-text">
            직접 링크를 입력하거나 파일을 선택하세요.
          </div>

          {/* 파일 업로드 */}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="form-control mt-2"
            onChange={onFileSelect}
            aria-label="로컬 이미지 파일 선택"
          />

          {/* 미리보기 */}
          {preview && (
            <div
              className="text-center mt-3"
              aria-label="이미지 미리보기 영역"
              role="region"
            >
              <img
                src={preview}
                alt="업로드된 이미지 미리보기"
                style={{
                  maxWidth: "400px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          )}
        </div>

        {/* 날짜 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="add-date" className="form-label">
              추가 날짜
            </label>
            <input
              id="add-date"
              type="date"
              name="addDate"
              className="form-control"
              value={form.addDate || ""}
              onChange={onChange}
              aria-label="제품 추가 날짜 선택"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="revise-date" className="form-label">
              수정 날짜
            </label>
            <input
              id="revise-date"
              type="date"
              name="reviseDate"
              className="form-control"
              value={form.reviseDate || ""}
              onChange={onChange}
              aria-label="제품 수정 날짜 선택"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            aria-label="변경 내용 저장 버튼"
          >
            {saving ? "저장 중..." : "저장"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
            onKeyDown={(e) => e.key === "Enter" && navigate(-1)}
            disabled={saving}
            aria-label="수정 취소 버튼"
          >
            취소
          </button>
        </div>
      </form>

      {/* 동영상 미리보기 */}
      {form.videoUrl && (
        <div
          className="ratio ratio-16x9 my-4 mx-auto"
          style={{ maxWidth: 800 }}
          role="region"
          aria-label="동영상 미리보기"
        >
          <iframe
            title="미리보기 영상"
            src={form.videoUrl}
            allowFullScreen
            aria-label="등록된 영상 미리보기"
          ></iframe>
        </div>
      )}
    </div>
  );
}
