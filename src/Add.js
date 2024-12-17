import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  const [inputData, setInputData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); // جلوگیری از رفرش صفحه

    try {
      // گرفتن لیست کاربران برای محاسبه id بعدی
      const response = await axios.get("http://localhost:3030/users");
      const users = response.data;

      // محاسبه id جدید
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

      // ارسال داده جدید با id ترتیبی
      await axios.post("http://localhost:3030/users", {
        id: newId,
        name: inputData.name,
        email: inputData.email,
      });

      alert("کاربر اضافه شد");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      alert("خطایی در اضافه کردن کاربر رخ داده است.");
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          {/* فیلد نام */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
              required
            />
          </div>

          {/* فیلد ایمیل */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={inputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              required
            />
          </div>

          {/* دکمه ارسال */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
