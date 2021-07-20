import React, { useEffect, useState } from 'react'
import {FaSpinner} from 'react-icons/fa'
import './Adduser.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

function Adduser(props) {
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const [ userName, setUserName] = useState();
    const [ userFname, setUserFname] = useState();
    const [ userEmail, setUserEmail] = useState();
    const [ userPwd, setUserPwd] = useState();
    const [ userCpwd, setUserCpwd] = useState();
    const [ userPhone, setUserPhone] = useState();
    const [ userDesignation, setUserDesignation] = useState();
    const [ userRole, setUserRole] = useState();
    const [ userStatus, setUserStatus] = useState("1");
    const [ userActdate, setUserActdate] = useState();
    const [ userDactdate, setUserDactdate] = useState();
    
    const [ showForm, setShowForm] = useState(true);

    const [ roleLov, setRoleLov] = useState([]);
    const [ mandDact, setMandDact ] = useState(false);


    if (props.formAccess === false){
        setShowForm(false);
    } 

    const statusLov = [
        {key : "", value:"Select Status"},
        {key : "1", value:"Active"},
        {key : "2", value:"Inactive"}
    ]


    const getRoleLovData = () => {
        fetch("http://database.mssoftware.xyz/getRolesData", {
            method : 'Get',
            headers:{
                'Content-Type':'application/json',
                    }
        }).then(response => response.json())
        .then(response => {setRoleLov(response);
        console.log('My API data : ',response);
        });
       return roleLov; 
    } 

    useEffect(() => {
        getRoleLovData();
        setUserActdate(setDateFormat());
    },[]);

    const setDateFormat = (value)=> {
        let currentDate;
        if (value){
            currentDate = new Date(value);
        }else{
            currentDate = new Date();
        }
        
        let currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(currentDate);
        let currentMonth = new Intl.DateTimeFormat("en", {month: "numeric",}).format(currentDate);
        let currentDay = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(currentDate);
        
        console.log(`${currentDay}-${currentMonth}-${currentYear}`);
    
        // let formatedDate = currentDay + "-0" + currentMonth + "-" + currentYear;

        let formatedDate;

        if (currentMonth in [1,2,3,4,5,6,7,8,9]){
            formatedDate = currentYear + "-0" + currentMonth + "-" + currentDay;
        }else{
            formatedDate = currentYear + "-" + currentMonth + "-" + currentDay;
        }

        return formatedDate;
    }

    const onStatusChange = (value) => {
        if (value === "2"){
            setMandDact(true);
            setUserDactdate(setDateFormat());
        }else{
            setMandDact(false);
            setUserDactdate("");
        } 
    }

    const handleSubmit = (event) => {
        console.log('event : ',event.target[0].id);
        console.log('event : ',event.target[0].value);
        event.preventDefault();

        if ( userPwd == userCpwd){
            // alert('Hello');
            
            Axios.post("http://database.mssoftware.xyz/insertUserData", {
                userName  : userName,
                userFname : userFname,
                userEmail : userEmail,
                userPwd : userPwd,
                userCpwd : userCpwd,
                userPhone : userPhone,
                userDesignation : userDesignation,
                userRole : userRole,
                userStatus : userStatus,
                userActdate : userActdate,
                userDactdate : userDactdate,
               }).then((res) => {
                 console.log("result set in effect: ", res);
                //  history.push("/");
               });

               history.push("/");

        }else if ( userPwd != userCpwd){
            alert('your password are not Identical');
            return false;
        }

    }

  

    const handleChangeEvent = (e) => {
        console.log('e.target.name : ', e.target.value);
        // return (e.target.name = e.target.value);
       
        const input = e.target.name

        if(input == "userName"){
            setUserName(e.target.value)
        } else if(input === "userFname"){
            setUserFname(e.target.value)
        } else if(input === "userEmail"){
            setUserEmail(e.target.value)
        } else if(input === "userPwd"){
            setUserPwd(e.target.value)
        } else if(input === "userCpwd"){
            setUserCpwd(e.target.value)
        } else if(input === "userPhone"){
            setUserPhone(e.target.value)
        } else if(input === "userDesignation"){
            setUserDesignation(e.target.value)
        } else if(input === "userRole"){
            setUserRole(e.target.value)
        } else if(input === "userStatus"){
            setUserStatus(e.target.value);
            onStatusChange(e.target.value);
        } else if(input === "userActdate"){
            setUserActdate(e.target.value)
        } else if(input === "userDactdate"){
            setUserDactdate(e.target.value)
        }
    }

    const subscribe = () => {
        setLoading(true);
    
            fetch("http://database.mssoftware.xyz")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setLoading(false);
            });
      };

    return (
        <>
        <div className  ="scrollbar square scrollbar-lady-lips thin">
            <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
    <div>
                <div className="heading-layout1">
                    <div className="item-title">
                        <h3 style={{ padding: "50px",marginRight:'650px',color:"red" }}>Add User</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="row">
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userName">User name</label>
                            <input type="text" class="form-control is-valid" id="userName" name="userName" value={userName} onChange={handleChangeEvent} required/>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label htmlFor="userFname">Full Name</label>
                            <input type="text" class="form-control is-valid" id="userFname" name="userFname" value={userFname} onChange={handleChangeEvent} required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userEmail">User Email</label>
                            <input type="text" class="form-control is-valid" id="userEmail" name="userEmail" value={userEmail} onChange={handleChangeEvent} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userPwd">Password</label>
                            <input type="password" class="form-control is-valid" id="userPwd" name="userPwd" value={userPwd} onChange={handleChangeEvent} required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userCpwd">Confirm Password</label>
                            <input type="password" class="form-control is-valid" id="userCpwd" name="userCpwd" value={userCpwd} onChange={handleChangeEvent} required />  
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userPhone">Phone</label>
                            <input type="text" class="form-control is-valid" id="userPhone" name="userPhone" value={userPhone} onChange={handleChangeEvent} required />
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userDesignation">Designation</label>
                            <input type="text" class="form-control is-valid" id="userDesignation" name="userDesignation" value={userDesignation} onChange={handleChangeEvent} required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userRole">Role</label>
                            <select class="form-control is-valid" id="userRole" name="userRole" value={userRole} onChange={handleChangeEvent} required>
                            <option key="" value="">Select Role</option>
                            {roleLov.map((data) => <option key={data.RL_ID} value={data.RL_ID}>{data.RL_NAME}</option>)} 
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userStatus">Status</label>
                            <select class="form-control is-valid" id="userStatus" name="userStatus" value={userStatus} onChange={handleChangeEvent} required>
                            {statusLov.map((data) => <option key={data.key} value={data.key}>{data.value}</option>)} 
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-4 mb-3">

                            <label htmlFor="userActdate">Activation Date</label>
                            <input type="date" class="form-control is-valid" id="userActdate" name="userActdate" value={userActdate} onChange={handleChangeEvent}  disabled />
                        </div>
                        <div class="col-md-4 mb-3">

                            <label htmlFor="userDactdate">Deactivation Date</label>
                            <input type="date" class="form-control is-valid" id="userDactdate" name="userDactdate" value={userDactdate} onChange={handleChangeEvent}  required={mandDact} disabled />
                        </div>
                    </div>
                    <div style={{marginRight:'765px'}}>
                    <p>
                    {!isLoading && (
                      <button className="btn btn-outline-success" onClick={subscribe}>
                        Submit
                      </button>
                    )}
                    {isLoading && (
                      <button className="btn btn-outline-success" disabled>
                        <i className="fas fa-spinner fa-spin"> <FaSpinner/></i> Submit...
                      </button>
                    )}
                  </p>
                    </div>
                </form> 
    </div>

</div>
</div>

        </>
    )
}

export default Adduser
