import React from "react";
import SuccessAlert from "../Components/SuccessAlert";
import InfoAlert from "../Components/InfoAlert";
import WarningAlert from "../Components/WarningAlert";
import DangerAlert from "../Components/DangerAlert";


export default function Notifications() {
    
    return (
      <>
       <h2>Notifications</h2>
       <SuccessAlert/>
       <InfoAlert/>
       <WarningAlert/>
       <DangerAlert/>
      </>
    );

}
