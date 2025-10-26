import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Container } from "react-bootstrap";
import iyagiLogo from "../../image/iyagi-logo.png";
import "../../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // 로그인 성공 처리
    localStorage.setItem("auth", "true");
    alert(`${data.email}님, 로그인되었습니다!`);
    navigate("/main");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="shadow-lg p-4">
        <div className="text-center mb-3">
          <img src={iyagiLogo} alt="이약이 로고" style={{ width: "150px" }} />
          <h4 className="mt-3">로그인</h4>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "이메일은 필수입니다.",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password", {
                required: "비밀번호는 필수입니다.",
                minLength: { value: 6, message: "6자 이상 입력해주세요." },
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100" variant="primary">
            로그인
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
