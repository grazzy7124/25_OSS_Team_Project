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
          addDate: s.addDate ?? "",
          reviseDate: s.reviseDate ?? "",
        }
      : null;
  });

  const [loading, setLoading] = React.useState(!location.state);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

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
          addDate: d.addDate ?? "",
          reviseDate: d.reviseDate ?? "",
        });
      })
      .catch((e) => setError("데이터를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id, form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 간단한 유효성 검사
    if (!form.name.trim()) return setError("이름을 입력하세요.");
    if (!form.videoUrl.trim()) return setError("동영상 링크를 입력하세요.");

    setSaving(true);
    try {
      // 수정 날짜 갱신 (YYYY-MM-DD)
      const today = new Date().toISOString().slice(0, 10);
      const payload = { ...form, reviseDate: today };

      await axios.put(`${API_URL}/${id}`, payload);
      // 저장 후 상세로 이동 (state도 넘겨서 즉시 반영되게)
      navigate(`/detail/${id}`, { replace: true, state: payload });
    } catch (e) {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <div className="container mt-4">불러오는 중...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">수정</h4>
        <div className="btn-group btn-group-sm">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            ← Back
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">이름</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={onChange}
            placeholder="제품명"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">회사</label>
          <input
            type="text"
            name="company"
            className="form-control"
            value={form.company}
            onChange={onChange}
            placeholder="제조사"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">표준 코드</label>
          <textarea
            name="stdCode"
            className="form-control"
            rows={2}
            value={form.stdCode}
            onChange={onChange}
            placeholder="긴 코드도 자동 줄바꿈됩니다"
            style={{ wordBreak: "break-all" }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">동영상 URL</label>
          <input
            type="url"
            name="videoUrl"
            className="form-control"
            value={form.videoUrl}
            onChange={onChange}
            placeholder="https://..."
          />
          <div className="form-text">유튜브/임베드 가능한 링크를 입력하세요.</div>
        </div>

        {/* 필요하면 날짜 필드도 편집 가능하게 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">추가 날짜</label>
            <input
              type="date"
              name="addDate"
              className="form-control"
              value={form.addDate || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">수정 날짜</label>
            <input
              type="date"
              name="reviseDate"
              className="form-control"
              value={form.reviseDate || ""}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "저장 중..." : "저장"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            취소
          </button>
        </div>
      </form>

      {/* 미리보기 */}
      {form.videoUrl && (
        <div className="ratio ratio-16x9 my-4 mx-auto" style={{ maxWidth: 800 }}>
          <iframe title="미리보기" src={form.videoUrl} allowFullScreen />
        </div>
      )}
    </div>
  );
}
