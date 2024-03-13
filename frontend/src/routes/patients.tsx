import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import PatientForm from "../components/patient-form";
import ICD10Search from "../components/icd";

export interface Patient {
    id: number;
    lastName: string;
    firstName: string;
    age: number;
    diagnosis?: string; // diagnosis is optional
  }
  
  export default function Patients() {
     const [details, setDetails] = useState<Patient[]>([]); // Define type of details
     const [showForm, setShowForm] = useState<boolean>(false);
     const [patientToUpdate, setPatientToUpdate] = useState<Patient>({} as Patient); // Define type of patientToUpdate
     const [selectedPatient, setSelectedPatient] = useState<number | null>(null); // Define type of selectedPatient
     const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null); // Define type of selectedDiagnosis
     const [sortModel, setSortModel] = useState<GridSortModel>([
        {
           field: "id",
           sort: "asc", // Ascending order
        },
     ]);
  
     const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5, minWidth: 150 },
        { field: "lastName", headerName: "Last name", flex: 0.5, minWidth: 150 },
        {
           field: "firstName",
           headerName: "First name",
           flex: 0.5,
           minWidth: 150,
        },
        {
           field: "age",
           headerName: "Age",
           flex: 0.5,
           minWidth: 100,
        },
        {
           field: "delete",
           headerName: "",
           type: "number",
           flex: 0.5,
           minWidth: 100,
           renderCell: (params) => (
              <button
                 className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                 onClick={() => handleDelete(params.row.id)}
              >
                 Delete
              </button>
           ),
        },
        {
           field: "edit",
           headerName: "",
           type: "number",
           flex: 0.5,
           minWidth: 100,
           renderCell: (params) => (
              <button
                 className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700"
                 onClick={() => handleEdit(params.row)}
              >
                 Edit
              </button>
           ),
        },
        {
           field: "diagnosis",
           headerName: "ICD-10 Code",
           sortable: true,
           flex: 0.5,
           minWidth: 180,
           renderCell: (params) => {
              //If there is a diagnosis, show it. If there isn't, display the "Add Diagnosis" button
              if (params.row.diagnosis) {
                 return <div>{params.row.diagnosis}</div>;
              } else {
                 return (
                    <button
                       className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover-bg-blue-700"
                       onClick={() => handleDiagnosisButtonClick(params.row)}
                    >
                       Add Diagnosis
                    </button>
                 );
              }
           },
        },
     ];
  
     const rows = details.map((patient) => {
        console.log({patient})
        return ({
            id: patient.id,
            lastName: patient.lastName,
            firstName: patient.firstName,
            age: patient.age,
            diagnosis: patient.diagnosis,
         })
     });
  
     //Get patients from the database
     useEffect(() => {
        axios
           .get("http://localhost:8000/api/patients")
           .then((res) => {
            console.log(res)
              const data: Patient[] = res.data; // Define type of data
              console.log("data in call", data)
              setDetails(data);
           })
           .catch((err) => {
              console.log(err);
           });
     }, []);
  
     //Delete a patient
     const handleDelete = (patientId: number) => {
        axios
           .delete(`http://localhost:8000/api/patients/${patientId}`)
           .then(() => {
              // Delete the patient from the frontend and display remaining patients
              setDetails((prevDetails) =>
                 prevDetails.filter((patient) => patient.id !== patientId)
              );
           })
           .catch((err) => {
              console.error("Error deleting patient:", err);
              if (err.response) {
                 console.error("Server Response:", err.response.data);
              }
           });
     };
  
     // Update a patient
     const updatePatient = (formData: Patient | null) => { // Define type of updatedFormData
        axios
           .put(`http://localhost:8000/api/patients/${patientToUpdate!.id}/`, {
              //Reformat data: snake to camel case because of django backend and js frontend
              first_name: formData?.firstName,
              last_name: formData?.lastName,
              age: formData?.age,
           })
           .then(() => {
              // Update the patient data on the frontend with the updatedFormData
              setDetails((prevDetails) =>
                 prevDetails.map((patient) =>
                    patient.id === patientToUpdate!.id
                       ? { ...patient, ...formData }
                       : patient
                 )
              );
              // Clear the patientToUpdate state and hide the form
              setPatientToUpdate({} as Patient);
              setShowForm(false);
           })
           .catch((err) => {
              console.error("Error updating patient:", err);
              if (err.response) {
                 console.error("Server Response:", err.response.data);
              }
           });
     };
  
     // If the Edit button is clicked, set the patient to update and show the form
     const handleEdit = (patient: Patient) => {
        setPatientToUpdate(patient);
        setShowForm(true);
     };
  
     const handleDiagnosisButtonClick = (patient: Patient) => {
        setSelectedPatient(patient.id);
        // Set the selected patient data
        setPatientToUpdate(patient);
     };

   return (
    <>
    <Navbar />
    <div className="flex flex-col">
        <div className="flex justify-center pt-8 pb-4">
            {showForm && (
                <PatientForm
                    updatePatient={updatePatient}
                    patientToUpdate={patientToUpdate}
                />
            )}
        </div>
    </div>
    <div className="flex items-center justify-between w-full px-4 mb-2">
        <div className="ml-4 text-3xl ">Patients
        <button
            className="p-1 pl-2 pr-2 ml-2 text-white rounded bg-navbarblue"
            onClick={() => {
                setShowForm(!showForm);
            }}
        >
            {showForm ? "-" : "+"}
        </button>
        </div>
    </div>
    <div className="flex flex-wrap w-full px-4">
        <div className="w-full lg:w-2/3 lg:pr-2">
            <div className="ml-4">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sortModel={sortModel}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onSortModelChange={(newSortModel) =>
                        setSortModel(newSortModel)
                    }
                />
            </div>
        </div>
        <div className="w-full mt-4 lg:w-1/3 lg:pl-2 lg:mt-0">
            <ICD10Search
                selectedDiagnosis={selectedDiagnosis}
                setSelectedDiagnosis={setSelectedDiagnosis}
                patientId={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                patientInfo={patientToUpdate}
                setDetails={setDetails}
            />
        </div>
    </div>
</>
   );
}
