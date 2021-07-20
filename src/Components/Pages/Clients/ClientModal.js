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

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { openPopup, setOpenPopup } = props;

    const classes = useStyles();

    const [cqdate, setCqdate] = useState("29-04-2001");
    const [cqclient, setCqclient] = useState("shabaz");
    const [cqname, setCqname] = useState("tetwet");
    const [cqmobileNo, setCqmobileNo] = useState("8150899321");
    const [cqemail, setCqemail] = useState("mohammwdbilal930@gmail.com");
    const [tAc, settAc] = useState();
    const [ischeked, setIsChecked] = useState(false);

    let newData = [];
    let test = [];

    const ontest = () => {
        setIsChecked(!ischeked);
        setCqtypes(ischeked ? "Equipment" : "Man Power");
    };

    const [cqtypes, setCqtypes] = useState("Equipment");

    let taskList = {
        description: "",
        unit: "",
        qty: "",
        mobAnddemob: "",
        amount: "",
    };

    const [users, setUsers] = useState([]);


    const optionUnit = [
        { key: "", value: "" },
        { key: "Month", value: "Month" },
        { key: "Week", value: "Week" },
        { key: "Day", value: "Day" },
        { key: "Hour", value: "Hour" },
    ];

    const handleChangeEvent = (e, index) => {
        const input = e.target.name;

        if (input === "cqdate") {
            setCqdate(e.target.value);
        } else if (input === "cqclient") {
            setCqclient(e.target.value);
        } else if (input === "cqname") {
            setCqname(e.target.value);
        } else if (input === "cqmobileNo") {
            setCqmobileNo(e.target.value);
        } else if (input === "cqemail") {
            setCqemail(e.target.value);
        } else if (input === "cqtypes") {
            setCqtypes(e.target.value);
        } else if (input === "tAc") {
            settAc(e.target.value);
        } else if (
            ["description", "unit", "qty", "mobAnddemob", "amount"].includes(input)
        ) {
            console.log("exceptional handling");
            changeHandler(e, index);
        }

        console.log(
            "Name : ",
            e.target.name,
            " - Value - ",
            e.target.value,
            " - dataset id - ",
            e.target
        );
        console.log("log of order Items : ", users);
    };

    const addUser = () => {
        setUsers([...users, taskList]);
    };

    const removeUsers = (index) => {
        console.log("index value :", index);
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);

        setUsers(filteredUsers);
    };

    const changeHandler = (e, index) => {
        const updatedUsers = users.map((item, i) =>
            index === i
                ? Object.assign(item, { [e.target.name]: e.target.value })
                : item
        );
        console.log("newnew:", e.target.value);

        let test = updatedUsers.length - 1;

        if (e.target.name === "unit_rate") {
            console.log("value of quamtity :", e);
            console.log("value of quamtity bhaya :", updatedUsers[test].qty);
        }

        setUsers(updatedUsers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cqdate);
        console.log(cqclient);
        console.log(cqname);
        console.log(cqmobileNo);
        console.log(cqemail);
        console.log(cqtypes);
        //console.log(tAc);
        console.log("multirow  data :", users);
    };

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle >
                <div style={{ display: 'flex' }}>

                    <div className="heading-layout1">
                        <div className="item-title">
                            <h4 style={{ color: "blue" }}>Add Client</h4>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenPopup(false)}
                        style={{ flex: "end" }}
                    >
                        X
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
                    <div className="scroll">                
                        <form >
                            <div className="row">
                                <div class="col-md-6 mb-3">
                                    <label for="userName">Contact Person Name</label>
                                    <input type="text" class="form-control is-valid" id="userName" name="userName" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="userName">Company Name</label>
                                    <input type="text" class="form-control is-valid" id="userName" name="userName" required />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-6 mb-3">
                                    <label for="userName">Mobile</label>
                                    <input type="text" class="form-control is-valid" id="userName" name="userName" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="userName">Email</label>
                                    <input type="text" class="form-control is-valid" id="userName" name="userName" required />
                                </div>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label for="userFname">Address</label>
                                <textarea type="text" class="form-control is-valid" id="userFname" name="userFname" required />
                            </div>

                            <div>

                                <button type="submit" class="btn btn-outline-success">Submit</button>
                            </div>
                        </form>





                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}