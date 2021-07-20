import React, { useState } from "react";
import Multirow from "./Multirow";
import Orderitem from "./Orderitem";

// function Createpurchaseorder() {

  class Createpurchaseorder extends React.Component {

  state = {
    podocno:" 123",
    podate:" 21-06-2021",
    porevno:" 123",
    ponumber:"",
    poquotationref:"",
    poproject:"",
    popaymentmode:"",
    povendor:"",
    pocode:"",
    pophone:"",
    pocpperson:"",
    pomobile:"",
    poemail:"",
    povat:"",
    poadd:"",
    postartdate:"",
    poenddate:"",
    polocation:"",
    pomobilizationdate:"",
    podesc:"",
    pototal:parseInt(0),
    pogst:"10",
    pograndtotal:parseInt(0),
    instruction:"1. Payment shall be made for the quantities executed as per unit rates given above. \n2. Work Order number and date must be quoted on all correspondence. \n3. This order is subject to the terms and conditions set out on the face and Annexure -A \n4. The acceptance copy must be signed by vender or by its representative ( on vender’s behalf) on the face and Annexure - A \n 5. This Work Order is subject to the cancellation unless the subcontractor returns one copy signed with confirmation that all terms and conditions are accepted. \n 6. The following attachments form an integral part of this work Order.",
    deliveryTerms:"1. Lubricants, top-up oil, repairs, daily maintenance, Service and Consumables of the Equipments shall be provide by Vender. \n2. In case of breakDown or Maintenance, Vwndor/Supplier shall provide a replacement of equipment immediatly at no extra cost.",
    conditionTerms:"1. Above rate is applicable for 10 hours per day, 6 days a week, 260 hours per Month. \n2. Working Duration: 2 Month Extandable. \n3. Supply Food, accommodation & Transportation scope Entema al-shamal. \n4. Above Rate is exclusive of VAT. \n5. If you need any clarification on above matter or any assistance please feel free to contract undersigned. \n6. Vendor has to return the same purchase order to Entema Al-shamal by Fax or Email after Confirmation Signature.",
    taskList: [
          {
              index: Math.random(),
              description: "",
              unit: "",
              qty: "",
              unitrate: "",
              amount:"0"
          },
        ],
    edata:"",
       
    }
    

  // const  [podocno,setPodocno]=useState();
  // const  [podate,setPodate]=useState();
  // const  [porevno,setPorevno]=useState();
  // const  [ponumber,setPonumber]=useState();
  // const  [poquotationref,setPoquotationref]=useState();
  // const  [poproject,setPoproject]=useState();
  // const  [popaymentmode,setPopaymentmode]=useState();
  // const  [povendor,setPovendor]=useState();
  // const  [pocode,setPocode]=useState();
  // const  [pophone,setPophone]=useState();
  // const  [pocpperson,setPocpperson]=useState();
  // const  [pomobile,setPomobile]=useState();
  // const  [poemail,setPoemail]=useState();
  // const  [povat,setPovat]=useState();
  // const  [poadd,setPoadd]=useState();
  // const  [postartdate,setPostartdate]=useState();
  // const  [poenddate,setPoenddate]=useState();
  // const  [polocation,setPolocation]=useState();
  // const  [pomobilizationdate,setPomobilizationdate]=useState();
  // const  [podesc,setPodesc]=useState();
  
  // const  [pooisrno,setPooisrno]=useState();
  // const  [pooidesc,setPooidesc]=useState();
  // const  [pooiunit,setPooiunit]=useState();
  // const  [pooiqty,setPooiqty]=useState();
  // const  [pooiunitrate,setPooiunitrate]=useState();
  // const  [pooiamount,setPooiamount]=useState();
  
  // const  [pototal,setPototal]=useState(100);
  // const  [pogst,setPogst]=useState(5);
  // const  [pograndtotal,setPograndtotal]=useState(1000);

  // const [instruction, setInstruction] = useState("1. Payment shall be made for the quantities executed as per unit rates given above. \n2. Work Order number and date must be quoted on all correspondence. \n3. This order is subject to the terms and conditions set out on the face and Annexure -A \n4. The acceptance copy must be signed by vender or by its representative ( on vender’s behalf) on the face and Annexure - A \n 5. This Work Order is subject to the cancellation unless the subcontractor returns one copy signed with confirmation that all terms and conditions are accepted. \n 6. The following attachments form an integral part of this work Order.");
  // const [deliveryTerms, setDeliveryTerms] = useState("1. Lubricants, top-up oil, repairs, daily maintenance, Service and Consumables of the Equipments shall be provide by Vender. \n2. In case of breakDown or Maintenance, Vwndor/Supplier shall provide a replacement of equipment immediatly at no extra cost.");
  // const [conditionTerms, setConditionTerms] = useState("1. Above rate is applicable for 10 hours per day, 6 days a week, 260 hours per Month. \n2. Working Duration: 2 Month Extandable. \n3. Supply Food, accommodation & Transportation scope Entema al-shamal. \n4. Above Rate is exclusive of VAT. \n5. If you need any clarification on above matter or any assistance please feel free to contract undersigned. \n6. Vendor has to return the same purchase order to Entema Al-shamal by Fax or Email after Confirmation Signature.");

  // const [taskList , setTasklist] = useState([{index: Math.random(),description: "",unit: "",qty: "",unitRate:"",amount:""}]);

    // componentWillMount = () => {
    //   alert('default call CWM');

    //   let x = 0;

    //   // for(x = 0 ; x < 2; x++ ){

        
    //   //   this.addNewRow();

    //   //   // taskList[i][constqty] = 1;
    //   //   // taskList[i][constunitrate] = 10;
    //   //   // taskList[i][constamount] = 10;
    //   //   alert('i ki value : ', parseInt(x));
    //   // }


    //   do {
    //     alert('i ki value : '+ x);

    //       this.addNewRow();
  
    //       x++;
    //   }
    //   while (x < 2);

    // }


    // componentDidMount = () => {

    //   alert('fuck me');


    //   let constamount = "amount";
    //   let constqty = "qty";
    //   let constunitrate = "unitrate";
    //   let taskList = [...this.state.taskList];

    //   let x = 0;

    //   do {
    //     alert('i ki value : '+ x);

    //     taskList[x][constqty] = 1;
    //     taskList[x][constunitrate] = 10;
    //     taskList[x][constamount] = 10;
  
    //       x++;
    //   }
    //   while (x < 2);
    // }

    handleChangeEvent = (e) => {

      if (e.target.name === "conditionTerms"){
        this.setState({ [e.target.name]: e.target.value });
      }

      

      // this.setState({edata:e});

    // alert('hello');
    console.log('e.target.value : ', e.target.value);
    console.log('e.target.name : ', e.target.name);
    // return (e.target.name = e.target.value);
   

    // if(e.target.name == "unitrate"){
      // console.log('e.target.name : ', e.target.name)
      // console.log('Yeah bro : ', e.target.value);
      // console.log('tested id : ', e.target.dataset.id);
      // console.log('tested value : ', e.target.value * 12);

    // if (
    //   ["description", "unit", "qty", "unitrate","amount"].includes(
    //     e.target.name
    //   )
    // )
    

      let constamount = "amount";
      let constqty = "qty";
      let constunitrate = "unitrate";

      let taskList = [...this.state.taskList];
      taskList[e.target.dataset.id][e.target.name] = e.target.value;

      this.setState({taskList : taskList});


      console.log('12 taskList[e.target.dataset.id][constqty] : ',taskList[e.target.dataset.id][constqty].value);

      console.log('14 taskList[e.target.dataset.id][constqty] : ',this.state.taskList);

      // alert(taskList[e.target.dataset.id][constqty]);

      if (e.target.name === "unitrate" && taskList[e.target.dataset.id][constqty] != ""){
 
        console.log('taskList[e.target.dataset.id][constqty] : ',taskList[e.target.dataset.id][constqty]);

      let actualAmount = parseInt(taskList[e.target.dataset.id][constqty]) * parseInt(taskList[e.target.dataset.id][constunitrate]);

      console.log('actualAmount : ',actualAmount);

      // this.state.taskList = taskList;

      console.log('this.state.pototal : ',parseInt(this.state.pototal));

      console.log('actualAmount :'+ actualAmount);

      let newCount = parseInt(this.state.pototal) + parseInt(actualAmount);

      console.log('newCount :'+ newCount);

      if ((taskList[e.target.dataset.id][constqty] != "") && (taskList[e.target.dataset.id][constunitrate] != "")){
        // alert('m in ');
        
        taskList[e.target.dataset.id][constamount] = parseInt(actualAmount);


        let test = (newCount / parseInt(100) * this.state.pogst);
        let grandtotal = test + newCount;

        this.setState({
          pototal: newCount, pograndtotal : grandtotal
        })


      }

      // this.setState({...this.state.pototal, pototal: parseInt(this.state.pototal) + parseInt(actualAmount)});

      console.log('My total data : ', this.state.pototal);
    // }
      
  } 



    // if (
    //   ["description", "unit", "qty", "unitrate","amount"].includes(
    //     e.target.name
    //   )
    // ) {
    //   let taskList = [...this.state.taskList];
    //   taskList[e.target.dataset.id][e.target.name] = e.target.value;


    //   console.log('My total data : ', this.state.taskList);
    // } else {
    //   this.setState({ [e.target.name]: e.target.value });
    // }

  }

  handleSubmit = (e) => {
    e.preventDefault();


    for (var i = 0; i < this.state.taskList.length; i++) {
      if (
        this.state.taskList[i].description === "" ||
        this.state.taskList[i].unitrate === ""
      ) {
      
        return false;
      }
    }

  };


  addNewRow = () => {
    this.setState((prevState) => ({
      taskList: [
        ...prevState.taskList,
        {
          index: Math.random(),
          description: "",
          unit: "",
          qty: "",
          unitrate: "",
          amount:""
        },
      ],
    }));
  };


  deteteRow = (index) => {
    this.setState({
      taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
    });
    // const taskList1 = [...this.state.taskList];
    // taskList1.splice(index, 1);
    // this.setState({ taskList: taskList1 });
  };

  clickOnDelete(record) {
    this.setState({
      taskList: this.state.taskList.filter((r) => r !== record),
    });
  }

  render() {
    let { taskList } = this.state; //let { notes, date, description, taskList } = this.state
  return (
    <>
      <div
        class="container"
        style={{ paddingTop: "30px", paddingLeft: "50px" }}
      >
        <div className="scroll">
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Purchase Orders</h3>
            </div>
          </div>
          <form  onSubmit={this.handleSubmit}
              onChange={this.handleChangeEvent}>
            <div className="heading-layout1">
              <div className="item-title">
                <h5 style={{ color: "blue" }}>New Purchase Orders</h5>
              </div>
            </div>
            {/* <div className="row">
              <div class="col-md-4 mb-3">
                <label for="podocno">Doc No : </label>
                <input type="text" class="form-control is-valid" id="podocno" name="podocno"  required />
                {this.state.podocno}
              </div>
              <div class="col-md-4 mb-3">
                <label for="podate">Date : </label>
                <input type="date" class="form-control is-valid" id="podate" name="podate"  required />
                {this.state.podate}
              </div>
              <div class="col-md-4 mb-3">
                <label for="porevno">Rev. No : </label>
                <input type="text" class="form-control is-valid" id="porevno" name="porevno"  required />
                {this.state.porevno}
              </div>
            </div> */}
              <div class="col-md-4 mb-3">
                <label for="podocno">Doc No : </label>
                {this.state.podocno}
              </div>
              <div class="col-md-4 mb-3">
              <label for="podate">Date : </label>
                {this.state.podate}
              </div>
              <div class="col-md-4 mb-3">
              <label for="porevno">Rev. No : </label>
                {this.state.porevno}
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
                <input type="text" class="form-control is-valid" id="ponumber" name="ponumber"  required />
              </div>
              <div class="col-md-6 mb-3">
                <label for="poquotationref">Quotation Ref</label>
                <input type="text" class="form-control is-valid" id="poquotationref" name="poquotationref"  required />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="poproject">Project</label>
                <input type="text" class="form-control is-valid" id="poproject" name="poproject"  required />
              </div>
              <div class="col-md-6 mb-3">
                <label for="popaymentmode">Mode / Terms Payment</label>
                <input type="text" class="form-control is-valid" id="popaymentmode" name="popaymentmode"  required />
              </div>
            </div>
            <hr style={{ backgroundColor: "#030000" }} />
            <div className="heading-layout1">
              <div className="item-title">
                <h5 style={{ color: "blue " }}>Vendor Info</h5>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="povendor">Vendor</label>
              <select
                class="form-control is-valid"
                id="povendor"
                name="povendor" 
                
                required
              >
                <option value="">Select Vendors</option>
                <option value="1">Zeeshan</option>
                <option value="2">shabaz</option>
              </select>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="pocode">Code</label>
                <input type="text" class="form-control is-valid" id="pocode" name="pocode"  required />
              </div>
              <div class="col-md-4 mb-3">
                <label for="pophone">Phone Number</label>
                <input type="text" class="form-control is-valid" id="pophone" name="pophone"  required />
              </div>

              <div class="col-md-4 mb-3">
                <label for="pocpperson">Contact Person</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="pocpperson"
                  name="pocpperson"
                  
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="pomobile">Mobile</label>
                <input type="text" class="form-control is-valid" id="pomobile" name="pomobile"  required />
              </div>
              <div class="col-md-4 mb-3">
                <label for="poemail">Email</label>
                <input type="text" class="form-control is-valid" id="poemail" name="poemail"  required />
              </div>
              <div class="col-md-4 mb-3">
                <label for="povat">Vat</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="povat"
                  name="povat"
                  
                  required
                />
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <label for="poadd">Address</label>
              <textarea
                type="text" class="form-control is-valid" id="poadd" name="poadd"  required
              />
            </div>
            <hr style={{ backgroundColor: "#030000" }} />
            <div className="heading-layout1">
              <div className="item-title">
                <h5 style={{ color: "blue" }}>Work Order</h5>
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="postartdate">Start Date</label>
                <input
                  type="date"
                  class="form-control is-valid" id="postartdate" name="postartdate" 
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="poenddate">End Date</label>
                <input
                  type="date"
                  class="form-control is-valid" id="poenddate" name="poenddate" 
                  required
                />
              </div>{" "}
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="polocation">Location</label>
                <input type="text" class="form-control is-valid" id="polocation" name="polocation"  required />
              </div>
              <div class="col-md-6 mb-3">
                <label for="pomobilizationdate">Mobilization Date</label>
                <input
                  type="date"
                  class="form-control is-valid" id="pomobilizationdate" name="pomobilizationdate"  required />              </div>
            </div>

            <div class="col-md-10 mb-3">
              <label for="podesc">Description of work:</label>
              <textarea
              type="text" class="form-control is-valid" id="podesc" name="podesc"  required />
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
                      <th style={{paddingLeft:'30px'}}>Description</th>
                      <th style={{paddingLeft:'56px'}}>Unit</th>
                      <th style={{paddingLeft:'45px'}}>QTY</th>
                      <th style={{paddingLeft:'30px'}}>Unit rate (Sar)</th>
                      <th style={{paddingLeft:'30px'}}>Amount (sar)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Multirow
                      add={this.addNewRow}
                      delete={this.clickOnDelete.bind(this)}
                      taskList={taskList}
                      change={this.handleChangeEvent}
                      edata={this.state.edata}
                    />
                  </tbody>
                </table>
            <hr style={{ backgroundColor: "green" }} />
            <div class="col-md-3 mb-3">
              <label for="userActdate">TOTAL</label>
              <br />
              {this.state.pototal}
            </div>
            <div class="col-md-3 mb-3">
              <label for="pogst">GST</label>
              <input
                type="number"
                class="form-control is-valid"
                id="pogst"
                name="pogst"
                value={this.state.pogst}
                onChange = {this.handleChangeEvent}
                required
              />
            </div>
            <div class="col-md-3 mb-3">
              <label for="userActdate"> GRAND TOTAL</label>
              <br />
              {this.state.pograndtotal}
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
                onChange = {this.handleChangeEvent}
                id="instruction"
                value={this.state.instruction}
              />
            </div>
            <div class="col-md-12 mb-3">
              <label for="deliveryTerms">Terms of delivery</label>
              <textarea
                type="text"
                className="form-control is-valid"
                name="deliveryTerms"
                onChange = {this.handleChangeEvent}
                id="deliveryTerms"
                value={this.state.deliveryTerms}
              />
            </div>
            <div class="col-md-12 mb-3">
              <label for="conditionTerms">Terms & Conditions</label>
              <textarea
                type="text"
                className="form-control is-valid"
                name="conditionTerms"
                onChange = {this.handleChangeEvent}
                id="conditionTerms"
                value={this.state.conditionTerms}
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
    </>
  );
  }
}

export default Createpurchaseorder;
