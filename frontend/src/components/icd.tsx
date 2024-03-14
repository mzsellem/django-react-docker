import { useState, useEffect } from "react";
import axios from "axios";
import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from "@mui/material";
import { Patient } from "../routes/patients";

interface ICD10SearchProps {
   selectedDiagnosis: string,
   setSelectedDiagnosis: React.Dispatch<React.SetStateAction<string>>,
   patientId: number | null,
   setSelectedPatient: React.Dispatch<React.SetStateAction<number | null>>,
   patientInfo: Patient,
   setDetails: React.Dispatch<React.SetStateAction<Patient[]>>
}

export default function ICD10Search({
   //Pass this data from patients.jsx as props to use in icd.jsx
   selectedDiagnosis,
   setSelectedDiagnosis,
   patientId,
   setSelectedPatient,
   patientInfo,
   setDetails
}: ICD10SearchProps) {
   const [searchTerm, setSearchTerm] = useState("");
   const [results, setResults] = useState([]); // State to store the results of diagnosis search
   const [showResults, setShowResults] = useState(true); // State to control whether to show or hide results

   const handleDiagnosisSelection = (code: string) => {
      setSelectedDiagnosis(code);
      setShowResults(false);
      setSearchTerm("")
   };

   useEffect(() => {
      if (selectedDiagnosis) {
         // Send a PUT request to update the patient's diagnosis
         axios
            .put(`http://localhost:8000/api/patients/${patientId}/`, {
               diagnosis: selectedDiagnosis,
               //Reformat data: snake to camel case because of django backend and js frontend
               age: patientInfo.age,
               last_name: patientInfo.lastName,
               first_name: patientInfo.firstName,
            })
            .then(() => {
               // Handle success: update the patient data in 'details' state with the updated diagnosis
               setDetails((prevDetails) =>
                  prevDetails.map((patient) =>
                     patient.id === patientId
                        ? { ...patient, diagnosis: selectedDiagnosis }
                        : patient
                  )
               );
               // Clear the selected patient and diagnosis
               setSelectedPatient(null);
               setSelectedDiagnosis("");
            })
            .catch((err) => {
               console.error("Error adding diagnosis:", err);
               if (err.response) {
                  console.error("Server Response:", err.response.data);
               }
            });
      }
      //Watch for changes in diagnosis and patientId
   }, [selectedDiagnosis, patientId]);

   //Get data from third party api and set results (setResults)
   const handleSearch = async () => {
      try {
         const response = await axios.get(
            `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${searchTerm}`
         );
         setResults(response.data[3]);
         setShowResults(true)
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   return (
      <>
         <div className="flex flex-col ml-4">
            <div className="flex mb-4">
               <div className="flex items-center mr-2 text-lg">
                  ICD-10 Code Search
               </div>
               <div className="flex">
                  <input
                     className="border rounded-lg"
                     type="text"
                     placeholder="Enter search term"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                           handleSearch();
                        }
                     }}
                  />
                  <button
                     className="p-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-700"
                     onClick={handleSearch}
                  >
                     Search
                  </button>
               </div>
            </div>
            {showResults &&  results.length > 0 && (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Code</TableCell>
                           <TableCell>Description</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {/* Display results of ICD10 search */}
                        {results.map((result) => (
                           <TableRow key={result[0]}>
                              <TableCell>{result[0]}</TableCell>
                              <TableCell>{result[1]}</TableCell>
                              <TableCell>
                                 <button
                                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                                    onClick={() =>
                                       handleDiagnosisSelection(
                                          result[0]
                                       )
                                    }
                                 >
                                    Select
                                 </button>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </div>
            )}
         </div>
      </>
   );
}
