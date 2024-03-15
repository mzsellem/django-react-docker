// src/Form.js
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Patient } from "../routes/patients";
interface FormProps {
   patientToUpdate: Patient;

   // TODO: could be a problem later, check back in
   updatePatient: (formData: Patient | null) => void;
   getPatients: () => void;
   setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
 }

export default function Form({ patientToUpdate, updatePatient, getPatients, setShowForm }: FormProps) {
   //If patient needs to be updated, prefill form with selected patient
   const [formData, setFormData] = useState(patientToUpdate);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if(formData) {
         setFormData({ ...formData, [name]: value });
      } else {
         setFormData({
            id: 0,
            lastName: "",
            firstName: "",
            age: 0,
            diagnosis: ""
         })
      }
   };

   //Handle both create and update in one form: update the patient, otherwise create a new patient
   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      //if not default patient, update existing patient (0 is a falsy value)
      if (patientToUpdate && patientToUpdate.id > 0) {
         updatePatient(formData);
      } else {
         axios
            .post("http://localhost:8000/api/patients/", {
               //Reformat data: snake to camel case because of django backend and js frontend
               first_name: formData?.firstName,
               last_name: formData?.lastName,
               age: formData?.age,
            })
            .then((res) => {
               getPatients()
               setShowForm(false);
               console.log("Success!", res)
            })
            .catch((err) => console.log("Error!", err));
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="flex items-center space-x-4">
            <div>
               <label>Last Name:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>First Name:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>Age:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label>ICD-10 Code:&nbsp;</label>
               <input
                  className="border"
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis || ""}
                  disabled
               />
            </div>
            <button className="p-2 text-white rounded bg-navbarblue" type="submit">
               Save
            </button>
         </div>
      </form>
   );
}
