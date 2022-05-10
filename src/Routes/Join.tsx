import { userInfoData } from "../atoms";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    cursor: pointer;
    padding: 20px 0px;
    color: aliceblue;
    font-size: 16px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Loginwrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Titlewrap = styled.div`
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 30px 0px;
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 400px;
    height: 30px;
    padding: 15px 0px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 18px;
    margin-bottom: 10px;
    ::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
    &:focus {
      outline: none;
      border-color: #388e3c;
    }
  }
`;

const Joinbtn = styled.button`
  width: 400px;
  height: 50px;
  background-color: #388e3c;
  margin-top: 15px;
`;

const Authbtn = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #388e3c;
`;

interface ISignup {
  email: string;
  password: string;
  username: string;
}

function Join() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<ISignup>();
  const onSubmit = ({ username, password, email }: ISignup) => {
    postUserData();
  };
  const auth = () => {};

  const baseURL = "http://52.55.54.57:3333/member/signup";
  function postUserData() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        baseURL,
        JSON.stringify({
          email: watch().email,
          password: watch().password,
          username: watch().username,
        }),
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Wrapper>
      <Titlewrap>
        <Title>회원가입</Title>
      </Titlewrap>
      <Loginwrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("username", {
                required: "아이디 입력은 필수입니다.",
              })}
              placeholder="아이디를 입력하세요"
              type="text"
            />
            <Authbtn>중복</Authbtn>
          </div>
          <input
            {...register("password", {
              required: "비밀번호 입력은 필수입니다.",
            })}
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
          <input type="password" placeholder="비밀번호 재입력" />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("email", {
                required: "이메일 입력은 필수입니다.",
              })}
              placeholder="이메일를 입력하세요"
              type="text"
            />
            <Authbtn onClick={auth}>인증</Authbtn>
          </div>

          <input type="text" placeholder="이메일 인증 코드" />

          <Joinbtn>회원가입</Joinbtn>
        </Form>
      </Loginwrap>
    </Wrapper>
  );
}

export default Join;
