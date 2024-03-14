import Navbar from "../components/navbar";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

// import * as React from "react";

export default function Home() {
   const pageNavigationPluginInstance = pageNavigationPlugin();

   return (
      <>
         <Navbar />
         <div className="flex justify-center p-8 text-3xl">Hello BeyondMD!</div>
         <div style={{ width: '130vh', height: '68vh', margin: 'auto', overflow: 'auto' }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
               <Viewer
                  fileUrl="resume.pdf"
                  plugins={[pageNavigationPluginInstance]}
               />
            </Worker>
         </div>
      </>
   );
}
