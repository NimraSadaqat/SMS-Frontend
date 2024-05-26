import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./family.scss";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import Add from "../../components/add/Add";
import AddStudent from "../addStudent/AddStudent";
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
    field: "father_name",
    type: "string",
    headerName: "Father Name",
    width: 150,
  },
  {
    field: "mother_name",
    headerName: "Mother Name",
    width: 200,
    type: "string",
  },
  {
    field: "father_nic_number",
    type: "string",
    headerName: "Father's CNIC",
    width: 150,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 200,
  },
  {
    field: "father_cell_number",
    type: "string",
    headerName: "Father's Phone number",
    width: 200,
  },
];

const Family = () => {
    const [family, setFamily] = useState([]);
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const client = axios.create({
  //   baseURL: "http://127.0.0.1:8000/"
  // });

  useEffect(() => {
    async function getFamily() {
      const response = await axios.get("/students/family/");
      console.log(response);
      setFamily(response.data.data);
    }
    getFamily();
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Student's Families</h1>
        <Link to='/add/family'>Add New Family</Link>
        {/* <button onClick={() => setOpen(true)}>Add New Family</button> */}
      </div>
      
      <DataTable slug="users" columns={columns} rows={family} />
   
      {open && <AddStudent />}
    </div>
  );
};

export default Family;
