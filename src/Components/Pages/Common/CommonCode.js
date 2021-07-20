import { useState } from "react";

const GetClientData = () => {

    const [newData, setNewData] = useState([]);

    fetch("http://database.mssoftware.xyz/getClientDataForLov", {
        method : 'Get',
        headers:{
            'Content-Type':'application/json',
                }
    }).then(response => response.json())
    .then(response => {setNewData(response);
    console.log('My API data : ',response);
    });

   return newData; 
} 

export default GetClientData;