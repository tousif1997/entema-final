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

    const { openPopup, setOpenPopup } = props;

    const classes = useStyles();

    const [podocno, setPodocno] = useState();
    const [podate, setPodate] = useState();
    const [porevno, setPorevno] = useState();
    const [ponumber, setPonumber] = useState();
    const [poquotationref, setPoquotationref] = useState();
    const [poproject, setPoproject] = useState();
    const [popaymentmode, setPopaymentmode] = useState();
    const [povendor, setPovendor] = useState();
    const [pocode, setPocode] = useState();
    const [pophone, setPophone] = useState();
    const [pocpperson, setPocpperson] = useState();
    const [pomobile, setPomobile] = useState();
    const [poemail, setPoemail] = useState();
    const [povat, setPovat] = useState();
    const [poadd, setPoadd] = useState();
    const [postartdate, setPostartdate] = useState();
    const [poenddate, setPoenddate] = useState();
    const [polocation, setPolocation] = useState();
    const [pomobilizationdate, setPomobilizationdate] = useState();
    const [podesc, setPodesc] = useState();
    const [pototal, setPototal] = useState(0);
    const [pogst, setPogst] = useState(5);
    const [pograndtotal, setPograndtotal] = useState(0);

    const [instruction, setInstruction] = useState(
        "1. Payment shall be made for the quantities executed as per unit rates given above. \n2. Work Order number and date must be quoted on all correspondence. \n3. This order is subject to the terms and conditions set out on the face and Annexure -A \n4. The acceptance copy must be signed by vender or by its representative ( on vender’s behalf) on the face and Annexure - A \n 5. This Work Order is subject to the cancellation unless the subcontractor returns one copy signed with confirmation that all terms and conditions are accepted. \n 6. The following attachments form an integral part of this work Order."
    );
    const [deliveryTerms, setDeliveryTerms] = useState(
        "1. Lubricants, top-up oil, repairs, daily maintenance, Service and Consumables of the Equipments shall be provide by Vender. \n2. In case of breakDown or Maintenance, Vwndor/Supplier shall provide a replacement of equipment immediatly at no extra cost."
    );
    const [conditionTerms, setConditionTerms] = useState(
        "1. Above rate is applicable for 10 hours per day, 6 days a week, 260 hours per Month. \n2. Working Duration: 2 Month Extandable. \n3. Supply Food, accommodation & Transportation scope Entema al-shamal. \n4. Above Rate is exclusive of VAT. \n5. If you need any clarification on above matter or any assistance please feel free to contract undersigned. \n6. Vendor has to return the same purchase order to Entema Al-shamal by Fax or Email after Confirmation Signature."
    );

    const userTemplate = {
        description: "",
        unit: "",
        qty: "",
        unit_rate: "",
        amount: "",
    };

    const [orderItem, setOrderItem] = useState([]);

    const optionUnit = [
        { key: "", value: "" },
        { key: "Month", value: "Month" },
        { key: "Week", value: "Week" },
        { key: "Day", value: "Day" },
        { key: "Hour", value: "Hour" },
    ];

    const getVendorDetails = (vendorID) => {
        console.log("vendor Id : ", vendorID);

        axios
            .post("http://database.mssoftware.xyz/getVendorIDData", {
                vendorID,
            })
            .then((res) => {
                console.log("updated Values Successfully : ", res.data[0]);
                setPocode(res.data[0].VENDOR_CODE);
                setPophone(res.data[0].VENDOR_PHONE);
                setPocpperson(res.data[0].VENDOR_CPERSON);
                setPomobile(res.data[0].VENDOR_PHONE);
                setPoemail(res.data[0].VENDOR_EMAIL);
                setPovat(res.data[0].VENDOR_VAT);
                setPoadd(res.data[0].VENDOR_ADD);
            });
    };

    const generateUniqueId = () => {
        let currentDate = new Date();
        let uniqueValue =
            "" +
            currentDate.getFullYear() +
            (currentDate.getMonth() + 1) +
            currentDate.getDate() +
            currentDate.getHours() +
            currentDate.getMinutes() +
            currentDate.getSeconds() +
            currentDate.getMilliseconds();
        console.log("My unique Values :", uniqueValue);
        return uniqueValue;
    };

    useEffect(() => {
        let currentDate = new Date();
        let currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            currentDate
        );
        let currentMonth = new Intl.DateTimeFormat("en", {
            month: "numeric",
        }).format(currentDate);
        let currentDay = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
            currentDate
        );
        console.log(`${currentDay}-${currentMonth}-${currentYear}`);

        let formatedDate = currentDay + "-0" + currentMonth + "-" + currentYear;

        setPodate(formatedDate);

        let uniqueId = generateUniqueId();

        console.log("My unique Value :", uniqueId);
        setPodocno(uniqueId);
        setPorevno(uniqueId);
        // console.log('turned : ', result);
    }, []);

    const addItem = () => {
        setOrderItem([...orderItem, userTemplate]);
    };

    const handleBlur = (e, index) => {
        console.log("blurr on call e value : ", e);
        console.log("blurr on call index value : ", index);

        if (e.target.name === "unit_rate") {
            if (orderItem[index].qty != "") {
                let amount = orderItem[index].qty * orderItem[index].unit_rate;

                const updatedUsers = orderItem.map((item, i) =>
                    index === i ? Object.assign(item, { ["amount"]: amount }) : item
                );

                setOrderItem(updatedUsers);
            }
        } else if (e.target.name === "qty") {
            if (orderItem[index].unit_rate != "") {
                let amount = orderItem[index].qty * orderItem[index].unit_rate;

                const updatedUsers = orderItem.map((item, i) =>
                    index === i ? Object.assign(item, { ["amount"]: amount }) : item
                );

                setOrderItem(updatedUsers);
            }
        }
        let test123 = 0;

        for (var i = 0; i < orderItem.length; i++) {
            test123 = test123 + orderItem[i].amount;
        }

        let gtt = test123 / pogst;
        let gt = test123 + gtt;

        setPototal(test123);
        setPograndtotal(gt);

        //  console.log('blurr on call total amount value : ', test123);
        //  console.log('blurr on call order item value : ', amount);
    };

    const getArraySum = (a) => {
        var total = 0;
        for (var i in a) {
            total += a[i];
        }
        return total;
    };

    const changeHandler = (e, index) => {
        // console.log("Check my index :", index);

        // console.log(' target name :',e.target.name);

        const updatedUsers = orderItem.map((item, i) =>
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

        setOrderItem(updatedUsers);
    };

    const removeItem = (index) => {
        console.log("index value :", index);
        const filteredUsers = [...orderItem];
        filteredUsers.splice(index, 1);

        setOrderItem(filteredUsers);
    };

    const handleChangeEvent = (e, index) => {
        console.log("e : ", e);

        const input = e.target.name;

        if (input === "podocno") {
            setPodocno(e.target.value);
        } else if (input === "podate") {
            setPodate(e.target.value);
        } else if (input === "porevno") {
            setPorevno(e.target.value);
        } else if (input === "ponumber") {
            setPonumber(e.target.value);
        } else if (input === "poquotationref") {
            setPoquotationref(e.target.value);
        } else if (input === "poproject") {
            setPoproject(e.target.value);
        } else if (input === "popaymentmode") {
            setPopaymentmode(e.target.value);
        } else if (input === "povendor") {
            setPovendor(e.target.value);
            getVendorDetails(e.target.value);
        } else if (input === "pocode") {
            setPocode(e.target.value);
        } else if (input === "pophone") {
            setPophone(e.target.value);
        } else if (input === "pocpperson") {
            setPocpperson(e.target.value);
        } else if (input === "pomobile") {
            setPomobile(e.target.value);
        } else if (input === "poemail") {
            setPoemail(e.target.value);
        } else if (input === "povat") {
            setPovat(e.target.value);
        } else if (input === "poadd") {
            setPoadd(e.target.value);
        } else if (input === "postartdate") {
            setPostartdate(e.target.value);
        } else if (input === "poenddate") {
            setPoenddate(e.target.value);
        } else if (input === "polocation") {
            setPolocation(e.target.value);
        } else if (input === "pomobilizationdate") {
            setPomobilizationdate(e.target.value);
        } else if (input === "podesc") {
            setPodesc(e.target.value);
        } else if (input === "pototal") {
            setPototal(e.target.value);
        } else if (input === "pogst") {
            setPogst(e.target.value);
        } else if (input === "pograndtotal") {
            setPograndtotal(e.target.value);
        } else if (input === "instruction") {
            setInstruction(e.target.value);
        } else if (input === "deliveryTerms") {
            setDeliveryTerms(e.target.value);
        } else if (input === "conditionTerms") {
            setConditionTerms(e.target.value);
        } else if (["description", "unit", "qty", "unit_rate"].includes(input)) {
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
        console.log("log of order Items : ", orderItem);
    };

    const submitMultiRowData = (formData) => {
        console.log("onCall :", formData);
        axios
            .post("http://database.mssoftware.xyz/insertRespForm", {
                taskList: formData,
            })
            .then((res) => {
                console.log("updated Values Successfully : ", res.data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // submitMultiRowData(orderItem);

        axios
            .post("http://database.mssoftware.xyz/insertRespForm2", {
                poid: podocno,
                podocno: podocno,
                podate: podate,
                porevno: porevno,
                ponumber: ponumber,
                poquotationref: poquotationref,
                poproject: poproject,
                popaymentmode: popaymentmode,
                povendor: povendor,
                pocode: pocode,
                pophone: pophone,
                pocpperson: pocpperson,
                pomobile: pomobile,
                poemail: poemail,
                povat: povat,
                poadd: poadd,
                postartdate: postartdate,
                poenddate: poenddate,
                polocation: polocation,
                pomobilizationdate: pomobilizationdate,
                podesc: podesc,
                pototal: pototal,
                pogst: pogst,
                pograndtotal: pograndtotal,
                instruction: instruction,
                deliveryTerms: deliveryTerms,
                conditionTerms: conditionTerms,
                taskList: orderItem,
            })
            .then((res) => {
                console.log("updated Values Successfully : ", res.data);
            });

        console.log("multirow  data :", orderItem);
    };

    return (
        <div className  ="scrollbar square scrollbar-lady-lips thin">
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle >
                <div style={{ display: 'flex' }}>

                    <div className="heading-layout1">
                        <div className="item-title">
                            <h4 style={{ color: "blue" }}>Purchase Order</h4>
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

                <div
                    class="container"
                    style={{ paddingTop: "30px", paddingLeft: "50px" }}
                >
                    <div className="scroll">
                        {/*<div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Purchase Orders</h3>
            </div>
       </div>*/}
                        <form onSubmit={handleSubmit} onChange={handleChangeEvent}>

                            {/* <div className="row">
              <div class="col-md-4 mb-3">
                <label for="podocno">Doc No : </label>
                <input type="text" class="form-control is-valid" id="podocno" name="podocno"  required />
                {podocno}
              </div>
              <div class="col-md-4 mb-3">
                <label for="podate">Date : </label>
                <input type="date" class="form-control is-valid" id="podate" name="podate"  required />
                {podate}
              </div>
              <div class="col-md-4 mb-3">
                <label for="porevno">Rev. No : </label>
                <input type="text" class="form-control is-valid" id="porevno" name="porevno"  required />
                {porevno}
              </div>
            </div> */}
                            <div class="col-md-4 mb-1">
                                <label for="podocno">Doc No : </label>
                                &nbsp;{podocno}
                            </div>
                            <div class="col-md-4 mb-1">
                                <label for="podate">Date : </label>
                                {/* <input type="date" class="form-control is-valid" id="podate" name="podate"  value={podate} /> */}
                                &nbsp;{podate}
                            </div>
                            <div class="col-md-4 mb-1">
                                <label for="porevno">Rev. No : </label>
                                &nbsp;{porevno}
                            </div>

                            <hr style={{ backgroundColor: "#030000" }} />
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h5 style={{ color: "blue" }}>Work Order</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-6 mb-3">
                                    <label for="ponumber">Number</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="ponumber"
                                        name="ponumber"
                                        value={ponumber}
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="poquotationref">Quotation Ref</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="poquotationref"
                                        name="poquotationref"
                                        value={poquotationref}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-6 mb-3">
                                    <label for="poproject">Project</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="poproject"
                                        name="poproject"
                                        value={poproject}
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="popaymentmode">Mode / Terms Payment</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="popaymentmode"
                                        name="popaymentmode"
                                        value={popaymentmode}
                                    />
                                </div>
                            </div>
                            <hr style={{ backgroundColor: "#030000" }} />
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h5 style={{ color: "blue " }}>Vendor Info</h5>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="povendor">Vendor</label>
                                <select
                                    class="form-control is-valid"
                                    id="povendor"
                                    name="povendor"
                                    value={povendor}
                                >
                                    <option value="">Select Vendors</option>
                                    <option value="1">Zeeshan</option>
                                    <option value="5">shabaz</option>
                                    <option value="10">Mazhar</option>
                                </select>
                            </div>
                            <div className="row">
                                <div class="col-md-4 mb-3">
                                    <label for="pocode">Code</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="pocode"
                                        name="pocode"
                                        value={pocode}
                                    />
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="pophone">Phone Number</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="pophone"
                                        name="pophone"
                                        value={pophone}
                                    />
                                </div>

                                <div class="col-md-4 mb-3">
                                    <label for="pocpperson">Contact Person</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="pocpperson"
                                        name="pocpperson"
                                        value={pocpperson}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-4 mb-3">
                                    <label for="pomobile">Mobile</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="pomobile"
                                        name="pomobile"
                                        value={pomobile}
                                    />
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="poemail">Email</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="poemail"
                                        name="poemail"
                                        value={poemail}
                                    />
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="povat">Vat</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="povat"
                                        name="povat"
                                        value={povat}
                                    />
                                </div>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label for="poadd">Address</label>
                                <textarea
                                    type="text"
                                    class="form-control is-valid"
                                    id="poadd"
                                    name="poadd"
                                    value={poadd}
                                />
                            </div>
                            <hr style={{ backgroundColor: "#030000" }} />
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h5 style={{ color: "blue" }}>Work Schedule</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-6 mb-3">
                                    <label for="postartdate">Start Date</label>
                                    <input
                                        type="date"
                                        class="form-control is-valid"
                                        id="postartdate"
                                        name="postartdate"
                                        value={postartdate}
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="poenddate">End Date</label>
                                    <input
                                        type="date"
                                        class="form-control is-valid"
                                        id="poenddate"
                                        name="poenddate"
                                        value={poenddate}
                                    />
                                </div>{" "}
                            </div>
                            <div className="row">
                                <div class="col-md-6 mb-3">
                                    <label for="polocation">Location</label>
                                    <input
                                        type="text"
                                        class="form-control is-valid"
                                        id="polocation"
                                        name="polocation"
                                        value={polocation}
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="pomobilizationdate">Mobilization Date</label>
                                    <input
                                        type="date"
                                        class="form-control is-valid"
                                        id="pomobilizationdate"
                                        name="pomobilizationdate"
                                        value={pomobilizationdate}
                                    />{" "}
                                </div>
                            </div>

                            <div class="col-md-10 mb-3">
                                <label for="podesc">Description of work:</label>
                                <textarea
                                    type="text"
                                    class="form-control is-valid"
                                    id="podesc"
                                    name="podesc"
                                    value={podesc}
                                />
                            </div>
                            <hr style={{ backgroundColor: "#030000" }} />
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h5 style={{ color: "blue" }}>Order Items</h5>
                                </div>
                            </div>

                            {/* <Orderitem /> */}
                            <table
                                className="table display data-table text-nowrap dataTable no-footer"
                                id="DataTables_Table_test"
                                role="grid"
                                style={{ backgroundColor: "#a8x0ff" }}
                            >
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th style={{ paddingLeft: "30px" }}>Description</th>
                                        <th style={{ paddingLeft: "56px" }}>Unit</th>
                                        <th style={{ paddingLeft: "45px" }}>QTY</th>
                                        <th style={{ paddingLeft: "30px" }}>Unit rate (Sar)</th>
                                        <th style={{ paddingLeft: "30px" }}>Amount (sar)</th>
                                    </tr>
                                </thead>
                            </table>
                            <Container className={classes.root}>
                                <Paper component={Box} p={4}>
                                    {orderItem.map((item, index) => (
                                        <Grid
                                            container
                                            spacing={3}
                                            key={index}
                                            className={classes.inputGroup}
                                        >
                                            <Grid item md={3}>
                                                <TextField
                                                    label="Description"
                                                    name="description"
                                                    type="textarea"
                                                    //placeholder="Enter Your Name"
                                                    variant="outlined"
                                                    onChange={(e) => handleChangeEvent(e, index)}
                                                    value={item.description}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.inputGroup}
                                                >
                                                    <InputLabel htmlFor="outlined-age-native-simple">
                                                        Unit
                                                    </InputLabel>
                                                    <Select
                                                        native
                                                        value={item.unit}
                                                        onChange={(e) => handleChangeEvent(e, index)}
                                                        label="unit"
                                                        id="unit"
                                                        inputProps={{
                                                            name: "unit",
                                                            id: "outlined-age-native-simple",
                                                        }}
                                                    >
                                                        {optionUnit.map((optionGender) => {
                                                            return (
                                                                <option
                                                                    key={optionGender.key}
                                                                    value={optionGender.value}
                                                                >
                                                                    {optionGender.key}
                                                                </option>
                                                            );
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={2}>
                                                <TextField
                                                    type="number"
                                                    label="qty"
                                                    name="qty"
                                                    // placeholder="Add Quantity"
                                                    variant="outlined"
                                                    onChange={(e) => handleChangeEvent(e, index)}
                                                    value={item.qty}
                                                    onBlur={(e) => handleBlur(e, index)}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                                <TextField
                                                    type="number"
                                                    label="Unit Rate"
                                                    name="unit_rate"
                                                    // placeholder="Enter Your address"
                                                    variant="outlined"
                                                    onChange={(e) => handleChangeEvent(e, index)}
                                                    value={item.unit_rate}
                                                    onBlur={(e) => handleBlur(e, index)}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                                <TextField
                                                    type="number"
                                                    label="Amount"
                                                    name="amount"
                                                    // placeholder="Enter Your address"
                                                    variant="outlined"
                                                    onChange={(e) => handleChangeEvent(e, index)}
                                                    value={item.amount}
                                                    fullWidth
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item md={1}>
                                                <IconButton color="secondary">
                                                    <DeleteOutlineIcon onClick={() => removeItem(index)} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={addItem}
                                        style={{ marginTop: "10px" }}
                                    >
                                        Add Order Item
                                    </Button>
                                </Paper>
                            </Container>
                            <hr style={{ backgroundColor: "green" }} />
                            <div class="col-md-3 mb-3">
                                <label for="userActdate">TOTAL</label>
                                <br />
                                {pototal}
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="pogst">GST</label>
                                <input
                                    type="number"
                                    class="form-control is-valid"
                                    id="pogst"
                                    name="pogst"
                                    value={pogst}
                                    onChange={handleChangeEvent}
                                    required
                                />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="userActdate"> GRAND TOTAL</label>
                                <br />
                                {pograndtotal}
                            </div>

                            <hr style={{ backgroundColor: "#030000" }} />
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h5 style={{ color: "blue" }}>INSTRUCTIONS</h5>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="instruction">Instructions</label>
                                <textarea
                                    type="text"
                                    className="form-control is-valid"
                                    name="instruction"
                                    onChange={handleChangeEvent}
                                    id="instruction"
                                    value={instruction}
                                />
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="deliveryTerms">Terms of delivery</label>
                                <textarea
                                    type="text"
                                    className="form-control is-valid"
                                    name="deliveryTerms"
                                    onChange={handleChangeEvent}
                                    id="deliveryTerms"
                                    value={deliveryTerms}
                                />
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="conditionTerms">Terms & Conditions</label>
                                <textarea
                                    type="text"
                                    className="form-control is-valid"
                                    name="conditionTerms"
                                    onChange={handleChangeEvent}
                                    id="conditionTerms"
                                    value={conditionTerms}
                                />
                            </div>
                            <hr style={{ backgroundColor: "#030000" }} />
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h5 style={{ color: "blue" }}>Accepted By</h5>
                                </div>{" "}
                            </div>

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h4 className="vendor_name">Blueline Computers</h4>
                                        <div className="row">
                                            <div className="col-sm-5 col-xs-6 bot-left">
                                                Name &amp; Title
                                            </div>
                                            <div className="col-sm-7 col-xs-6 bot-right"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-5 col-xs-6 bot-left">Date</div>
                                            <div className="col-sm-7 col-xs-6 bot-right"></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <h4>For Entema Al Shamal Gen. cont. Est</h4>
                                        <h5>Authorised Signatory</h5>
                                    </div>
                                    <div className="col-sm-12 clearfix mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>{" "}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </div>
    )
}