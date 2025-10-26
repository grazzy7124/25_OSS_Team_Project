// components/App/Add.js
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const API_URL = "https://68db33b023ebc87faa324066.mockapi.io/OSS_teamproject";

export default function Add() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      company: "",
      stdCode: "",
      videoUrl: "",
      addDate: "",
      reviseDate: "",
      imageUrl: "", // 선택값 (mockapi에 imageUrl 필드가 있을 때 사용)
    },
  });

  const onSubmit = async (data) => {
    try {
      // 필요 시 공백을 null로 변환 (선택)
      const payload = {
        name: data.name.trim(),
        company: data.company.trim(),
        stdCode: data.stdCode.trim(),
        videoUrl: data.videoUrl.trim(),
        addDate: data.addDate || "",
        reviseDate: data.reviseDate || "",
        imageUrl: data.imageUrl?.trim() || "", // 선택 필드
      };

      await axios.post(API_URL, payload);
      alert("새 항목이 추가되었습니다!");
      reset();
      navigate("/"); // 프로젝트 라우팅에 맞게 "/" 혹은 "/main" 사용
    } catch (err) {
      console.error("추가 실패:", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm p-4 mx-auto" style={{ maxWidth: 720 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">새 항목 추가</h4>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} aria-label="새 항목 추가 폼">
          {/* 이름 */}
          <Form.Group className="mb-3" controlId="add-name">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="제품명 입력"
              aria-label="제품명 입력"
              isInvalid={!!errors.name}
              {...register("name", { required: "이름은 필수입니다." })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* 회사 */}
          <Form.Group className="mb-3" controlId="add-company">
            <Form.Label>회사</Form.Label>
            <Form.Control
              type="text"
              placeholder="제조사 입력"
              aria-label="제조사 입력"
              {...register("company")}
            />
          </Form.Group>

          {/* 표준 코드 */}
          <Form.Group className="mb-3" controlId="add-stdCode">
            <Form.Label>표준 코드</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="표준 코드 입력"
              aria-label="표준 코드 입력"
              {...register("stdCode")}
              style={{ wordBreak: "break-all" }}
            />
          </Form.Group>

          {/* 동영상 URL */}
          <Form.Group className="mb-3" controlId="add-videoUrl">
            <Form.Label>동영상 URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://..."
              aria-label="동영상 주소 입력"
              isInvalid={!!errors.videoUrl}
              {...register("videoUrl", {
                required: "동영상 URL은 필수입니다.",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "유효한 URL을 입력하세요.",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.videoUrl?.message}
            </Form.Control.Feedback>
            <Form.Text>유튜브/임베드 가능한 링크를 입력하세요.</Form.Text>
          </Form.Group>

          {/* (선택) 이미지 URL — mockapi에 imageUrl 필드가 있을 때만 사용 */}
          <Form.Group className="mb-3" controlId="add-imageUrl">
            <Form.Label>이미지 URL (선택)</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://... (이미지 주소)"
              aria-label="이미지 주소 입력"
              isInvalid={!!errors.imageUrl}
              {...register("imageUrl", {
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i,
                  message: "이미지 파일 URL을 입력하세요. (png, jpg, jpeg, gif, webp, svg)",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.imageUrl?.message}
            </Form.Control.Feedback>
            <Form.Text>mockapi의 imageUrl 필드와 매칭됩니다.</Form.Text>
          </Form.Group>

          {/* 날짜 */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="add-addDate">
                <Form.Label>추가 날짜</Form.Label>
                <Form.Control
                  type="date"
                  aria-label="추가 날짜"
                  {...register("addDate")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="add-reviseDate">
                <Form.Label>수정 날짜</Form.Label>
                <Form.Control
                  type="date"
                  aria-label="수정 날짜"
                  {...register("reviseDate")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* 버튼 */}
          <div className="d-flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              aria-label="저장"
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
              aria-label="취소하고 이전 페이지로 이동"
            >
              취소
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
