import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./students.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Add from "../../components/add/Add";
import axios from "../../plugins/axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "date_of_birth",
    type: "string",
    headerName: "Date of Birth",
    width: 150,
  },
  {
    field: "date_of_admission",
    type: "string",
    headerName: "Date of Admission",
    width: 200,
  },
  {
    field: "family",
    type: "string",
    headerName: "Family ID",
    width: 200,
  },
  {
    field: "admission_number",
    headerName: "Admission Number",
    width: 200,
    type: "string",
  },
];

const Students = () => {
    const [student, setStudent] = useState([]);
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const client = axios.create({
  //   baseURL: "http://127.0.0.1:8000/"
  // });

  useEffect(() => {
    async function getStudent() {
      const response = await axios.get("/students/");
      console.log(response);
      setStudent(response.data.data);
    }
    getStudent();
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Students</h1>
        <Link to='/add/student'>Add New Student</Link>
        {/* <button onClick={() => setOpen(true)}>Add New Student</button> */}
      </div>
      
      <DataTable slug="users" columns={columns} rows={student} />
   
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Students;
