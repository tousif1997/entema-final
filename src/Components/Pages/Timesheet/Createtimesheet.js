import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Grid,
    TextField,
    IconButton,
    Button,
} from "@material-ui/core";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Switch from '@material-ui/core/Switch';
import Select from "@material-ui/core/Select";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { RiUserSettingsLine } from 'react-icons/ri'




const useStyles = makeStyles((theme) => ({
    root: {
        width: "auto",
        height: "auto",
        backgroundColor: theme.palette.white,
        paddingTop: theme.spacing(5),
    },
    inputGroup: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
}));

function Createtimesheet() {

    const classes = useStyles();
    const history = useHistory();


    const [tsVendor, settsVendor] = useState();
    const [tsMonth, settsMont] = useState();
    const [tsYear, settsYear] = useState();
    const [tsDescription, settsDescription] = useState();
    const [tsPlotNo, settsPlotNo] = useState();
    const [tsOperatorName, settsOperatorName] = useState();
    const [tsMonthlyRate, settsMonthlyRate] = useState(10000);
    const [tsOtRate, settsOtRate] = useState();
    const [tsHrRate, settsHrRate] = useState();
    const [tsTotalHours, settsTotalHours] = useState();
    const [tsTotalOt, settsTotalOt] = useState();
    const [tsTotal, settsTotal] = useState();
    const [tsExpectedWorkingHours, settsExpectedWorkingHours] = useState(260);

    const [vendorLov,setVendorLov]=useState([]);
    const [yearLov,setYearLov]=useState([]);

    const [vendorDispValue, setVendorDispValue] = useState();
    


    let [taskList, setTasklist] = useState(
        {
            days1: "", days2: "", days3: "", days4: "", days5: "", days6: "", days7: "", days8: "", days9: "",
            days10: "", days11: "", days12: "", days13: "", days14: "", days15: "", days16: "", days17: "", days18: "",
            days19: "", days20: "", days21: "", days22: "", days23: "", days24: "", days25: "", days26: "", days27: "",
            days28: "", days29: "", days30: "", days31: ""
        }
    );

    const [users, setUsers] = useState([]);

    const [isInputHidden29, setIsInputHidden29] = useState(false);
    const [isInputHidden30, setIsInputHidden30] = useState(false);
    const [isInputHidden31, setIsInputHidden31] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);
    const [isDisabledRemove, setisDisabledRemove] = useState(false);

    const optionUnit = [
        { key: "Select Unit", value: "" },
        { key: "Month", value: "Month" },
        { key: "Week", value: "Week" },
        { key: "Day", value: "Day" },
        { key: "Hour", value: "Hour" },
    ];

    let newData = [];


    console.log(taskList);

    let noOfDays = 0;

    const addUser = () => {

        if (tsMonth != "" && tsYear != "") {
            setUsers([taskList]);
            setIsDisabled(!isDisabled)
            setisDisabledRemove(true);
        }


        noOfDays = checkCalendarDays(tsMonth, tsYear);

        console.log('returned value of calendar : ', noOfDays);

        if (noOfDays === 28) {
            setIsInputHidden29(true);
            setIsInputHidden30(true);
            setIsInputHidden31(true);
        } else if (noOfDays === 29) {
            setIsInputHidden30(true);
            setIsInputHidden31(true);
        } else if (noOfDays === 30) {
            setIsInputHidden31(true);
        } else {
            setIsInputHidden29(false);
            setIsInputHidden30(false);
            setIsInputHidden31(false);
        }
        console.log(isInputHidden29, isInputHidden30, isInputHidden31)
    };

    const onChangeVendorData = (value) => {

        console.log('onchange value is : ', value);
        let computedComments = vendorLov;
        console.log('onchange computedComments is : ', computedComments);
        if (value){
          computedComments = computedComments.filter((comment) => comment.VENDOR_ID == value); 
          
          setVendorDispValue(computedComments[0].VENDOR_NAME);
        }
        
      }

    const removeUsers = (index) => {
        if (tsMonth != "" && tsYear != "") {
            setIsDisabled(false)
            setisDisabledRemove(!isDisabledRemove);
        }

        setIsDisabled(!isDisabled)
        setisDisabledRemove(!isDisabledRemove);
        console.log("index value :", index);
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);

        setUsers(filteredUsers);
    };

    const checkCalendarDays = (month, year) => {
        /*assuming month = 3 and year = 2021 (make sure when you select march your variable returns you in number that is 3)*/
        return new Date(year, month, 0).getDate();
    }

    const changeHandler = (e, index) => {

        const updatedUsers = users.map((item, i) =>
            index === i
                ? Object.assign(item, { [e.target.name]: e.target.value })
                : item
        );
        console.log("newnew:", e.target.value);

        setUsers(updatedUsers);
    };

    const handleChangeEvent = (e, index) => {
        console.log('e : ', e);
        const input = e.target.name;

        console.log('field name : ', e.target.name + '- value -', e.target.value);

        if (input === "tsVendor") {
            settsVendor(e.target.value);
            clearMonthnYear();
            onChangeVendorData(e.target.value);
        } else if (input === "tsMonth") {
            settsMont(e.target.value);
        } else if (input === "tsYear") {
            settsYear(e.target.value);
            onYearChange(e.target.value);
        } else if (input === "tsDescription") {
            settsDescription(e.target.value);
        } else if (input === "tsPlotNo") {
            settsPlotNo(e.target.value);
        } else if (input === "tsOperatorName") {
            settsOperatorName(e.target.value);
        } else if (input === "tsExpectedWorkingHours") {
            settsExpectedWorkingHours(e.target.value);
        } else if (input === "tsMonthlyRate") {
            settsMonthlyRate(e.target.value);
        } else if (input === "tsOtRate") {
            settsOtRate(e.target.value);
        } else if (input === "tsHrRate") {
            settsHrRate(e.target.value);
        } else if (input === "tsTotalHours") {
            settsTotalHours(e.target.value);
        } else if (input === "tsTotalOt") {
            settsTotalOt(e.target.value);
        } else if (input === "tsTotal") {
            settsTotal(e.target.value);

        } else if (["days1", "days2", "days3", "days4", "days5", "days6", "days7", "days8", "days9", "days10", "days11", "days12", "days13", "days14", "days15", "days16", "days17", "days18", "days19", "days20", "days21", "days22", "days23", "days24", "days25", "days26", "days27", "days28", "days29", "days30", "days31"].includes(input)) {
            console.log('exceptional handling');
            changeHandler(e, index);
        }

        console.log("Name : ", e.target.name, " - Value - ", e.target.value, " - dataset id - ", e.target);
        console.log("log of order Items : ", users);
        if (tsMonth && tsYear != "") {
            setIsDisabled(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://database.mssoftware.xyz/insertVenTimesheetData", {
            tsvendor:tsVendor,
            tsmonth:tsMonth,
            tsyear:tsYear,
            tsdescription:tsDescription,
            tsplot:tsPlotNo,
            tsopname:tsOperatorName,
            tsexphours:tsExpectedWorkingHours,
            tsmonthrate:tsMonthlyRate,
            tsotrate:tsOtRate,
            tshrrate:tsHrRate,
            tstotalhour:tsTotalHours,
            tstotalot:tsTotalOt,
            tstotal:tsTotal,
            tsgrid:true,
            vendorDispValue:vendorDispValue,
        })
        .then((res) => {
          console.log("updated Values Successfully : ", res.data);
        });

        history.push("/");
        console.log('test submit');
    }

    const onYearChange = (value) => {
 
        axios.post("http://database.mssoftware.xyz/getVenTimesheetValidation", {
            
            pVendor:tsVendor,
            pMonth:tsMonth,
            pYear:value,

        })
        .then((res) => {
          console.log("My onchange year value : ",res.data[0].validate);

          if (res.data[0].validate > 0){
            alert("You have already generated timesheet for this vendor for the same Month and Year, Either Update the Value through report or create a New one");
            settsVendor("");
            settsMont("");
            settsYear("");
        }
        });
        
    }

    const getVendorLovData = () => {
        fetch("http://database.mssoftware.xyz/getVendorData", {
            method : 'Get',
            headers:{
                'Content-Type':'application/json',
                    }
        }).then(response => response.json())
        .then(response => {setVendorLov(response);
        console.log('My API data : ',response);
        });
       return vendorLov; 
    } 
    
    const getYearLovData = () => {
        fetch("http://database.mssoftware.xyz/getYearLov", {
            method : 'Get',
            headers:{
                'Content-Type':'application/json',
                    }
        }).then(response => response.json())
        .then(response => {setYearLov(response);
        console.log('My API data Year: ',response);
        });
       return yearLov; 
    } 

    useEffect(() => {

        getVendorLovData();
        getYearLovData();

        if (tsMonthlyRate != "" && tsExpectedWorkingHours != "") {
            // let perDay = Math.round(tsMonthlyRate/tsExpectedWorkingHours);
            let perDay = tsMonthlyRate / tsExpectedWorkingHours;
            settsOtRate(perDay.toFixed(2));
            settsHrRate(perDay.toFixed(2));
        }
    }, [tsMonthlyRate, tsExpectedWorkingHours])

    
    const MonthLov = [
        {key : "", value:"Select Month"},
        {key : "1", value:"Jan"},
        {key : "2", value:"Feb"},
        {key : "3", value:"Mar"},
        {key : "4", value:"Apr"},
        {key : "5", value:"May"},
        {key : "6", value:"Jun"},
        {key : "7", value:"Jul"},
        {key : "8", value:"Aug"},
        {key : "9", value:"Sep"},
        {key : "10", value:"Oct"},
        {key : "11", value:"Nov"},
        {key : "12", value:"Dec"}
    ];

    const clearMonthnYear = () => {
        settsMont("");
        settsYear("");
    }

    const testing = () => {
        console.log('testing bluee event');
        let Ottime = 0;
        let RHtime = 0;
        let OTamount = 0;
        let RHamount = 0;
        let TotalAmount = 0;

        if (tsTotalHours > tsExpectedWorkingHours) {
            console.log('Greater man');
            Ottime = tsTotalHours - tsExpectedWorkingHours;
            OTamount = tsOtRate * Ottime;
            settsTotalOt(OTamount.toFixed(2));
            console.log('Ottime : ', Ottime);
            console.log('OTamount : ', OTamount);

            RHamount = tsExpectedWorkingHours * tsHrRate;
            TotalAmount = OTamount + RHamount;
            settsTotal(TotalAmount.toFixed(2));

            console.log('RHamount : ', RHamount);
            console.log('TotalAmount : ', TotalAmount);

        } else {
            console.log('lesser man');
            RHamount = tsTotalHours * tsHrRate;
            settsTotalOt(0);
            settsTotal(RHamount.toFixed(2));
        }

    }

    return (
        <>
        <div class="scrollbar square scrollbar-lady-lips thin">
            <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
                <div className="heading-layout1">
                    <div className="item-title">
                        <h3 style={{ padding: "50px" }}>Vendor Time sheet</h3>
                    </div>

                </div>
                <form onChange={handleChangeEvent} onSubmit={handleSubmit}>

                    <div className="row">
                        <div class="col-md-4 mb-3" >
                            <label for="tsVendor">Vendor</label>
                            <select class="form-control is-valid" value={tsVendor} id="tsVendor" name="tsVendor" required>
                            <option key="" value="">Select Vendor</option>
                            {vendorLov.map((data) => <option key={data.VENDOR_ID} value={data.VENDOR_ID}>{data.VENDOR_NAME}</option>)} 
                            </select>
                        </div>
                        <div class="col-md-4 mb-3" >
                            <label for="tsMonth">Month</label>
                            <select class="form-control is-valid" value={tsMonth} id="tsMonth" name="tsMonth" required>
                                {MonthLov.map((data) => <option key={data.key} value={data.key}>{data.value}</option>)} 
                            </select>
                        </div>
                        <div class="col-md-4 mb-3" >
                            <label for="tsYear">Years</label>
                            <select class="form-control is-valid" value={tsYear} id="tsYear" name="tsYear" required>
                                <option value="">Select Year</option>
                                {yearLov.map((data) => <option key={data.ID} value={data.ID}>{data.YEAR}</option>)} 
                            </select>
                        </div>
                        <div></div>


                    </div>
                    <div className="row">
                        <div class="col-md-8 mb-3">
                            <label for="tsDescription">Description</label>
                            <textarea type="text" class="form-control is-valid" value={tsDescription} id="tsDescription" name="tsDescription" required />
                        </div></div><div className="row">
                        <div class="col-md-4 mb-3">
                            <label for="tsPlotNo">Plot No</label>
                            <input type="text" class="form-control is-valid" value={tsPlotNo} id="tsPlotNo" name="tsPlotNo" />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="tsOperatorName">Operator Name</label>
                            <input type="text" class="form-control is-valid" value={tsOperatorName} id="tsOperatorName" name="tsOperatorName" />

                        </div>   <div class="col-md-4 mb-3">
                            <label for="tsExpectedWorkingHours">Expected Working Hours</label>
                            <input type="text" class="form-control is-valid" value={tsExpectedWorkingHours} id="tsExpectedWorkingHours" name="tsExpectedWorkingHours" required/>

                        </div></div><div className="row">
                        <div class="col-md-4 mb-3">
                            <label for="tsMonthlyRate">Monthly Rate</label>
                            <input type="text" class="form-control is-valid" value={tsMonthlyRate} id="tsMonthlyRate" name="tsMonthlyRate" required />
                        </div>


                        <div class="col-md-4 mb-3">
                            <label for="tsOtRate">OT Rate</label>
                            <input type="text" class="form-control is-valid" id="tsOtRate" value={tsOtRate} name="tsOtRate" required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="tsHrRate">HR Rate</label>
                            <input type="text" class="form-control is-valid" id="tsHrRate" value={tsHrRate} name="tsHrRate" required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="tsTotalHours">Total Hours</label>
                            <input type="number" class="form-control is-valid" value={tsTotalHours} id="tsTotalHours" onBlur={testing} name="tsTotalHours" required/>

                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="tsTotalOt">Total OT</label>
                            <input type="text" class="form-control is-valid" id="tsTotalOt" value={tsTotalOt} name="tsTotalOt" required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="tsTotal">Total</label>
                            <input type="text" class="form-control is-valid" id="tsTotal" value={tsTotal} name="tsTotal" required />
                        </div>
                    </div>
                    <div >
                    <Container className={classes.root}>

                        {/* <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button color="default" onClick={addUser} disabled={isDisabled}>
                                Show
                            </Button>
                            <Button color="default" onClick={removeUsers} disabled={!isDisabledRemove}>
                                Remove
                            </Button></ButtonGroup> */}
                        {users.map((task, i) => (
                            <Grid
                                container
                                spacing={2}
                                key={i}
                                className={classes.inputGroup}

                            >
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 1"
                                        name="days1"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days1}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 2"
                                        name="days2"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days2}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 3"
                                        name="days3"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days3}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 4"
                                        name="days4"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days4}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 5"
                                        name="days5"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days5}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 6"
                                        name="days6"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days6}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 7"
                                        name="day7"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days7}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 8"
                                        name="days8"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days8}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 9"
                                        name="days9"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days9}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 10"
                                        name="days10"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days10}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 11"
                                        name="days11"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days11}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 12"
                                        name="days12"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days12}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 13"
                                        name="days13"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days13}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 14"
                                        name="days14"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days14}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day15"
                                        name="days15"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days15}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 16"
                                        name="days16"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days16}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 17"
                                        name="days17"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days17}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 18"
                                        name="days18"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days18}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 19"
                                        name="days19"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days19}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 20"
                                        name="days20"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days20}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 21"
                                        name="days21"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days21}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 22"
                                        name="days22"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days22}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 23"
                                        name="days23"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days23}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 24"
                                        name="days24"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days24}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 25"
                                        name="days25"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days25}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 26"
                                        name="days26"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days26}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 27"
                                        name="days27"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days27}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 28"
                                        name="days28"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days28}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 29"
                                        name="days29"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days29}
                                        fullWidth
                                        disabled={isInputHidden29}
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 30"
                                        name="days30"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days30}
                                        fullWidth
                                        disabled={isInputHidden30}
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        label="Day 31"
                                        name="days31"
                                        type="days"
                                        //placeholder="Enter Your Name"
                                        variant="outlined"
                                        onChange={(e) => handleChangeEvent(e, i)}
                                        value={task.days31}
                                        fullWidth
                                        disabled={isInputHidden31}
                                    />
                                </Grid>


                            </Grid>
                        ))}

                    </Container>
                    </div>
                    <button type="submit" class="btn btn-outline-success" style={{ marginTop: "20px", marginBottom: "40px" }}>Submit</button>
                </form>
            </div>
            </div>
        </>
    )
}

export default Createtimesheet;