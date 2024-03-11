import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import PatientForm from "../components/patient-form";
import ICD10Search from "../components/icd";

interface Patient {
    id: number;
    last_name: string;
    first_name: string;
    age: number;
    diagnosis?: string; // diagnosis is optional
  }
  
  export default function Patients() {
     const [details, setDetails] = useState<Patient[]>([]); // Define type of details
     const [showForm, setShowForm] = useState<boolean>(false);
     const [patientToUpdate, setPatientToUpdate] = useState<Patient | null>(null); // Define type of patientToUpdate
     const [selectedPatient, setSelectedPatient] = useState<number | null>(null); // Define type of selectedPatient
     const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null); // Define type of selectedDiagnosis
     const [isEditing, setIsEditing] = useState<boolean>(false);
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
  
     const rows = details.map((patient) => ({
        id: patient.id,
        lastName: patient.last_name,
        firstName: patient.first_name,
        age: patient.age,
        diagnosis: patient.diagnosis,
     }));
  
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
           .then((res) => {
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
     const updatePatient = (updatedFormData: Partial<Patient>) => { // Define type of updatedFormData
        axios
           .put(`http://localhost:8000/api/patients/${patientToUpdate!.id}/`, {
              //Reformat data: snake to camel case because of django backend and js frontend
              first_name: updatedFormData.first_name,
              last_name: updatedFormData.last_name,
              age: updatedFormData.age,
           })
           .then((res) => {
              // Update the patient data on the frontend with the updatedFormData
              setDetails((prevDetails) =>
                 prevDetails.map((patient) =>
                    patient.id === patientToUpdate!.id
                       ? { ...patient, ...updatedFormData }
                       : patient
                 )
              );
              // Clear the patientToUpdate state and hide the form
              setPatientToUpdate(null);
              setIsEditing(false); // Set back to non-editing mode
              setShowForm(false);
           })
           .catch((err) => {
              console.error("Error updating patient:", err);
              if (err.response) {
                 console.error("Server Response:", err.response.data);
              }
           });
     };
  
     useEffect(() => {
        console.log({ patientToUpdate });
     }, [patientToUpdate]);
     // If the Edit button is clicked, set the patient to update and show the form
     const handleEdit = (patient: Patient) => {
        setPatientToUpdate(patient);
        setIsEditing(true);
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
         <div>
                <h1>List of Patients</h1>
                <ul>
                    {details.map((patient) => (
                        <li key={patient.id}>
                            {patient.first_name} {patient.last_name}
                        </li>
                    ))}
                </ul>
            </div>
         <div className="flex flex-col">
            <div>
               <div className="flex justify-center pt-8 pb-4">
                  {showForm && (
                     <PatientForm
                        updatePatient={updatePatient}
                        patientToUpdate={patientToUpdate}
                     />
                  )}
               </div>
            </div>
         </div>
         <div className="flex">
            <div className="flex w-screen">
                  <div className="flex items-center mb-4 ml-4 text-3xl">Patients
                    <div className="flex">
                        <button
                            className="flex pl-1 pr-1 ml-2 text-white rounded p-1/2 bg-navbarblue"
                            onClick={()=> {
                                setShowForm(!showForm)
                            }}>
                                {showForm ? "-" : "+"}
                        </button>
                    </div>
                  </div>
            </div>
         </div>
         <div className="flex w-screen">
            <div className="flex w-2/3">
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
            <div className="flex w-1/3">
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
