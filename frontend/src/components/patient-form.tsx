// src/Form.js
import React, { useState } from "react";
import axios from "axios";

export default function Form({ patientToUpdate, updatePatient }) {
   //If patient needs to be updated, prefill form with selected patient
   const [formData, setFormData] = useState({ ...patientToUpdate } || {});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   //Handle both create and update in one form: update the patient, otherwise create a new patient
   function handleSubmit(e) {
      if (patientToUpdate) {
         e.preventDefault();
         updatePatient(formData);
      } else {
         axios
            .post("http://localhost:8000/api/patients/", {
               //Reformat data: snake to camel case because of django backend and js frontend
               first_name: formData.firstName,
               last_name: formData.lastName,
               age: formData.age,
            })
            .then((res) => console.log("Success!", res))
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
                  value=""
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
