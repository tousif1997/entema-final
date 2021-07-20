
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import Adduser from './Components/Pages/Users/Adduser';
import Viewuser from './Components/Pages/Users/Viewuser';

import AddVendors from './Components/Pages/Vendors/AddVendors';
import ViewVendors from './Components/Pages/Vendors/ViewVendors';

import AddClients from './Components/Pages/Clients/AddClients';
import ViewClients from "./Components/Pages/Clients/ViewClients";

import Createpurchaseorder from './Components/Pages/PurchaseOrder/Createpurchaseorder';
import Viewpurchaseorder from './Components/Pages/PurchaseOrder/Viewpurchaseorder';

import CreateQuotation from './Components/Pages/Quotation/CreateQuotation';
import ViewQuotation from './Components/Pages/Quotation/ViewQuotation';

import CreateTimesheet from './Components/Pages/Timesheet/Createtimesheet';
import CloneTimesheet from './Components/Pages/Timesheet/Clonetimesheet';
import ViewTimesheet from './Components/Pages/Timesheet/viewtimesheet';
import AddPayment from './Components/Pages/Timesheet/AddPayment';
import ViewVendorPayment from './Components/Pages/Timesheet/ViewVendorPayment';
import ApprovedTimesheet from './Components/Pages/Timesheet/Approvedtimesheet';

import AddManpower from './Components/Pages/Manpower/AddManpower';
import CreateManpower from './Components/Pages/Manpower/CreateManpower';
import ViewTimesheetm from './Components/Pages/Manpower/ViewTimesheetm';
import ViewManpower from './Components/Pages/Manpower/ViewManpower';
import PendinRequest from './Components/Pages/Manpower/PendinRequest';
import ApprovedRequest from './Components/Pages/Manpower/ApprovedRequest';

import CreateNote from './Components/Pages/DeliveryNotes/CreateNote';
import ViewNotes from './Components/Pages/DeliveryNotes/ViewNotes';
import Activities from "./Components/Pages/Users/Activities";
import Roles from "./Components/Pages/Users/Roles";


const Routes = (props) => {
 

  return (
  
    <Switch>
  
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/adduser" component={Adduser} />
    <Route path="/Viewuser" component={Viewuser} />
    <Route path="/roles" component={Roles} />
    <Route path="/activities" component={Activities} />
    <Route path="/addVendors" component={AddVendors} />
    <Route path="/ViewVendors" component={ViewVendors} />
    <Route path="/addClients" component={AddClients} />
    <Route path="/ViewClients" component={ViewClients} />
    <Route path="/Createpurchaseorder" component={Createpurchaseorder} />
    <Route path="/Viewpurchaseorder" component={Viewpurchaseorder} />
    <Route path="/CreateQuotation" component={CreateQuotation} />
    <Route path="/ViewQuotation" component={ViewQuotation} />
    <Route path="/CreateTimesheet" component={CreateTimesheet} />
    <Route path="/CloneTimesheet" component={CloneTimesheet} />
    <Route path="/ViewTimesheet" component={ViewTimesheet} />
    <Route path="/addpayment" component={AddPayment} />
    <Route path="/ApprovedTimesheet" component={ApprovedTimesheet} />

    <Route path="/AddManpower" component={AddManpower} />
    <Route path="/CreateManpower" component={CreateManpower} />
    <Route path="/ViewManpower" component={ViewManpower} />
    <Route path="/ViewTimesheetm" component={ViewTimesheetm} />
    <Route path="/PendinRequest" component={PendinRequest} />
    <Route path="/ApprovedRequest" component={ApprovedRequest} />
    <Route path="/ViewVendorPayment" component={ViewVendorPayment} />


    <Route path="/CreateNote" component={CreateNote} />
    <Route path="/ViewNotes" component={ViewNotes} />
   </Switch>


  );
};

export default Routes;
