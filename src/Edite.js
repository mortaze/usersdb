import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ id: "", name: "", email: "" }); // مقداردهی اولیه

  useEffect(() => {
    axios
      .get(`http://localhost:3030/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Error fetching user data:", err));
  }, [id]); // وابسته به id

  function handleSubmit(event) {
    event.preventDefault(); // اصلاح شد
    axios
      .put(`http://localhost:3030/users/${id}`, data)
      .then((res) => {
        alert("کاربر به‌روزرسانی شد");
        navigate("/");
      })
      .catch((err) => console.error("Error updating user data:", err));
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          {/* فیلد id */}
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              id="id"
              className="form-control"
              value={data.id || ""} // مقدار پیش‌فرض برای جلوگیری از خطا
              readOnly
            />
          </div>

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
              value={data.name || ""} // مقدار پیش‌فرض
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              value={data.email || ""} // مقدار پیش‌فرض
              onChange={(e) => setData({ ...data, email: e.target.value })}
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

export default Edite;
