import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        // درخواست حذف کاربر
        const response = await axios.delete(`http://localhost:3030/users/${id}`);
        if (response.status === 200 || response.status === 204) {
          alert("کاربر با موفقیت حذف شد.");
          navigate("/"); // بازگشت به صفحه اصلی
        } else {
          console.error("حذف کاربر ناموفق بود:", response.status);
          alert("خطایی در حذف کاربر رخ داده است.");
        }
      } catch (error) {
        console.error("خطا در حذف کاربر:", error);
        alert("خطا در حذف کاربر.");
      }
    };

    if (id) {
      deleteUser();
    }
  }, [id, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <h3>در حال حذف کاربر...</h3>
    </div>
  );
}

export default Delete;
