import React, { useState } from "react";
import axios from 'axios';
import config from "dotenv/config"; 

import { useHistory } from "react-router-dom";
function AddClients() {

  const history = useHistory();

  const [clientcpname, setClientcpname] = useState();
  const [clientcompname, setClientcompname] = useState();
  const [clientphone, setClientphone] = useState();
  const [clientemail, setClientemail] = useState();
  const [clientadd, setClientadd] = useState();
  const [createdby, setCreatedby] = useState("Mazhar");

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    if (input === "clientcpname") {
      setClientcpname(e.target.value);
    } else if (input === "clientcompname") {
        setClientcompname(e.target.value);
    } else if (input === "clientphone") {
        setClientphone(e.target.value);
    } else if (input === "clientemail") {
        setClientemail(e.target.value);
    } else if (input === "clientadd") {
        setClientadd(e.target.value);
    }
  }

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log("event : ", event);

    axios.post("http://database.mssoftware.xyz/insertClientData", {
    
    clientcpname:clientcpname ,
    clientcompname:clientcompname,
    clientphone:clientphone ,
    clientemail:clientemail ,
    clientadd:clientadd,
    createdby:createdby

   }).then((res) => {
    // setData(res.data);
    //  setDupData(res.data);
    console.log("result set in effect: ", res);
   });

   history.push("/");

  }

  return (
    <>
    <div className  ="scrollbar square scrollbar-lady-lips thin">
      <div
        class="container"
        style={{ paddingTop: "30px", paddingLeft: "50px" }}
      >
        <div className="scroll">
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Add Clients</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="clientcpname">Contact Person Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="clientcpname"
                  name="clientcpname"
                  onChange={handleChangeEvent}
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="clientcompname">Company Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="clientcompname"
                  name="clientcompname"
                  onChange={handleChangeEvent}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="clientphone">Mobile</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="clientphone"
                  name="clientphone"
                  onChange={handleChangeEvent}
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="clientemail">Email</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="clientemail"
                  name="clientemail"
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <label for="clientadd">Address</label>
              <textarea
                type="text"
                class="form-control is-valid"
                id="clientadd"
                name="clientadd"
                onChange={handleChangeEvent}
                required
              />
            </div>

            <div>
              <button type="submit" class="btn btn-outline-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default AddClients;