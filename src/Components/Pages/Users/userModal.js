import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import {
    Container,
    Grid,
    Paper,
    Box,
    TextField,
    IconButton,
    Button,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Select from "@material-ui/core/Select";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    root: {
        width: "auto",
        height: "auto",
        backgroundColor: theme.palette.grey[300],
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
    },
    inputGroup: {
        minWidth: 120,
    },
}))

export default function Popup(props) {

    console.log('detailed values of props :', props);

    const { openPopup, setOpenPopup, record } = props;

    const classes = useStyles();

    const [userID, setUserID] = useState();
    const [userName, setUserName] = useState();
    const [userFname, setUserFname] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPwd, setUserPwd] = useState();
    const [userCpwd, setUserCpwd] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userDesignation, setUserDesignation] = useState();
    const [userRole, setUserRole] = useState();
    const [userStatus, setUserStatus] = useState();
    const [userActdate, setUserActdate] = useState();
    const [userDactdate, setUserDactdate] = useState();
    const [newData, setNewData] = useState([]);

    useEffect(()=>{

        axios.post("http://database.mssoftware.xyz/getUserDataonId", {
            
            userID:record,
        })
        .then((res) => {
          console.log("records received ", res.data[0]);
          setNewData(res.data[0]);

        if (record > 0) {

          setUserName(res.data[0].USER_NAME);
          setUserFname(res.data[0].USER_FNAME);
          setUserEmail(res.data[0].USER_EMAIL);
          setUserPhone(res.data[0].USER_PHONE);
          setUserPwd(res.data[0].USER_PWD);
          setUserCpwd(res.data[0].USER_PWD);
          setUserDesignation(res.data[0].USER_DESIG);
          setUserRole(res.data[0].USER_ROLE);
          setUserStatus(res.data[0].USER_STATUS);
          setUserID(res.data[0].USER_ID);
          setUserActdate(res.data[0].USER_ACT_DATE);
          setUserDactdate(res.data[0].USER_DACT_DATE);
        }
        
        });

    },[record])

    const handleSubmit = (event) => {
        console.log('event : ', event.target[0].id);
        console.log('event : ', event.target[0].value);
        event.preventDefault();

        const formData = {
            userName: userName,
            userFname: userFname,
            userEmail: userEmail,
            userPwd: userPwd,
            userCpwd: userCpwd,
            userPhone: userPhone,
            userDesignation: userDesignation,
            userRole: userRole,
            userStatus: userStatus,
            userActdate: userActdate,
            userDactdate: userDactdate
        }

        if (userPwd === userCpwd) {
            alert('Hello');
        } else if (userPwd !== userCpwd) {
            alert('your password doesnot match');
            return false;
        }

        console.log('formData : ', formData);

    }

    const handleChangeEvent = (e) => {
        console.log('e.target.name : ', e.target.value);
        // return (e.target.name = e.target.value);

        const input = e.target.name

        if (input === "userName") {
            setUserName(e.target.value)
        } else if (input === "userFname") {
            setUserFname(e.target.value)
        } else if (input === "userEmail") {
            setUserEmail(e.target.value)
        } else if (input === "userPwd") {
            setUserPwd(e.target.value)
        } else if (input === "userCpwd") {
            setUserCpwd(e.target.value)
        } else if (input === "userPhone") {
            setUserPhone(e.target.value)
        } else if (input === "userDesignation") {
            setUserDesignation(e.target.value)
        } else if (input === "userRole") {
            setUserRole(e.target.value)
        } else if (input === "userStatus") {
            setUserStatus(e.target.value)
        } else if (input === "userActdate") {
            setUserActdate(e.target.value)
        } else if (input === "userDactdate") {
            setUserDactdate(e.target.value)
        }
    }

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle >
                <div style={{ display: 'flex' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenPopup(false)}
                        style={{ flex: "End" }}
                    >
                        Close
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3 style={{ padding: "50px" }}>Update User</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userName">User name</label>
                                <input type="text" class="form-control is-valid" id="userName" name="userName" value={userName} onChange={handleChangeEvent} required />
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="userFname">Full Name</label>
                                <input type="text" class="form-control is-valid" id="userFname" name="userFname" value={userFname} onChange={handleChangeEvent} required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userEmail">User Email</label>
                                <input type="text" class="form-control is-valid" id="userEmail" name="userEmail" value={userEmail} onChange={handleChangeEvent} required />
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userPwd">Password</label>
                                <input type="password" class="form-control is-valid" id="userPwd" name="userPwd" value={userPwd} onChange={handleChangeEvent} required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userCpwd">Confirm Password</label>
                                <input type="password" class="form-control is-valid" id="userCpwd" name="userCpwd" value={userCpwd} onChange={handleChangeEvent} required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userPhone">Phone</label>
                                <input type="text" class="form-control is-valid" id="userPhone" name="userPhone" value={userPhone} onChange={handleChangeEvent} required />
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userDesignation">Designation</label>
                                <input type="text" class="form-control is-valid" id="userDesignation" name="userDesignation" value={userDesignation} onChange={handleChangeEvent} required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userRole">Role</label>
                                <select class="form-control is-valid" id="userRole" name="userRole" value={userRole} onChange={handleChangeEvent} required>
                                    <option value="">Select Role</option>
                                    <option value="1">Admin</option>
                                    <option value="2">Operator</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userStatus">Status</label>
                                <select class="form-control is-valid" id="userStatus" name="userStatus" value={userStatus} onChange={handleChangeEvent} required>
                                    <option value="">select Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">InActive</option>

                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-4 mb-3">

                                <label for="userActdate">Activation Date</label>
                                <input type="date" class="form-control is-valid" id="userActdate" name="userActdate" onChange={handleChangeEvent} required />
                            </div>
                            <div class="col-md-4 mb-3">

                                <label for="userDactdate">Deactivation Date</label>
                                <input type="date" class="form-control is-valid" id="userDactdate" name="userDactdate" onChange={handleChangeEvent} required />
                            </div>
                        </div>
                        <div>

                            <button type="submit" class="btn btn-outline-success">Submit</button>
                        </div>
                    </form>
                </div>

            </DialogContent>
        </Dialog>
    )
}
