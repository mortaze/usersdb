import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/users")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setColumns(Object.keys(res.data[0]));
          setRecords(res.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <h1 className="text-center my-4 text-primary">لیست کاربران</h1>

      <div className="container mt-5">
        <div className="table-responsive">
          <div className="text-end">
            {" "}
            <Link className="btn btn-primary mb-2" to="/create">
              Add
            </Link>
          </div>
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                {columns.map((c, i) => (
                  <th key={i} className="text-center">
                    {c}
                  </th>
                ))}{" "}
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={i}>
                  {columns.map((column, j) => (
                    <td key={j} className="text-center">
                      {record[column]}
                    </td>
                  ))}
                  <th className="text-center">
                    <Link
                      className="btn btn-sm btn-danger me-2"
                      to={`/Delete/${record.id}`}
                    >
                      DELETE
                    </Link>
                    <Link
                      className="btn btn-sm btn-dark"
                      to={`Update/${record.id}`}
                    >
                      UPDATE
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
