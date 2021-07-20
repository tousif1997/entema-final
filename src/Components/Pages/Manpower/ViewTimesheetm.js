import React, { useEffect, useState, useMemo } from "react";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import axios from "axios";
import { IconButton, Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  
  const [yearLov, setYearLov] = useState([]);
  const [tsMonth, settsMont] = useState();
  const [tsYear, settsYear] = useState();

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "Id", field: "Id", sortable: false },
    { name: "Timesheet For", field: "Timesheet For", sortable: false },
    { name: "Month", field: "Month", sortable: false },
    { name: "Year", field: "Year", sortable: false },
    { name: "Total Hours", field: "Total Hours", sortable: false },
    { name: "Total", field: "Total", sortable: false },
    { name: "Created On", field: "Created On", sortable: false },
    { name: "Created By", field: "Created By", sortable: false },
    { name: "Status", field: "Status", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
  ];


  const MonthLov = [
    { key: "", value: "Select Month" },
    { key: "1", value: "Jan" },
    { key: "2", value: "Feb" },
    { key: "3", value: "Mar" },
    { key: "4", value: "Apr" },
    { key: "5", value: "May" },
    { key: "6", value: "Jun" },
    { key: "7", value: "Jul" },
    { key: "8", value: "Aug" },
    { key: "9", value: "Sep" },
    { key: "10", value: "Oct" },
    { key: "11", value: "Nov" },
    { key: "12", value: "Dec" },
  ];
  
  const getYearLovData = () => {
    fetch("http://database.mssoftware.xyz/getYearLov", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setYearLov(response);
        console.log("My API data Year: ", response);
      });
    return yearLov;
  };

  const getData = () => {
    // showLoader();

    // fetch("http://localhost:3009/getMPTimesheetDataonYearMonth")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     hideLoader();
    //     setComments(json);
    //     console.log(json);
    //   });

    console.log('month : ', tsMonth);
    console.log('year : ', tsYear);

    axios.post("http://database.mssoftware.xyz/getMPTimesheetDataonYearMonth", {
        
        venMonth:tsMonth,
        venYear:tsYear,
    })
    .then((res) => {
            console.log("updated Values Successfully : ", res.data);
            setComments(res.data);
            // hideLoader();
    });


  };

  useEffect(() => {
    // getData();
    getYearLovData();
  }, []);

  const removeMPTimeSheet = (tsId) => {
    axios
      .post("http://database.mssoftware.xyz/removeMPTSDataonId", {
        TSID: tsId,
      })
      .then((res) => {
        console.log("successfully deleted TS ", tsId);
        getData();
      });

    console.log("TimeSheet ID : ", tsId);
  };

  const test = (data) => {
    alert("hurrray :" + data);
  };

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.MTS_MANPOWER.toLowerCase().includes(search.toLowerCase()) ||
          comment.MTS_IQAMA.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);


  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <>
    <div className  ="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "3px", paddingLeft: "5px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>List of ManPower Timesheet</h3>
            </div>
          </div>

          <div className="row w-100">
            <div className="col mb-3 col-12 text-center">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div class="col-md-4 mb-3">
                  <label for="userRole">Month</label>
                  <select
                    class="form-control is-valid"
                    value={tsMonth}
                    id="tsMonth"
                    name="tsMonth"
                    onChange={(e)=> {settsMont(e.target.value)}}
                    required
                  >
                    {MonthLov.map((data) => (
                      <option key={data.key} value={data.key}>
                        {data.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="userRole">Years</label>
                  <select
                    class="form-control is-valid"
                    value={tsYear}
                    id="tsYear"
                    name="tsYear"
                    onChange={(e)=> {settsYear(e.target.value)}}
                    required
                  >
                    <option value="">Select Years</option>
                    {yearLov.map((data) => (
                      <option key={data.ID} value={data.ID}>
                        {data.YEAR}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <button type="submit" class="btn btn-outline-success"  >Filter</button> */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "31px", marginBottom: "40px" }}
                >
                  Filter
                </Button>

                {/* <div className="col-md-6 d-flex flex-row-reverse" style={{marginBottom:'30px',marginLeft:'340px'}}>
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div> */}
              </div>
            </form>

              <table className="table table-striped">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {commentsData.map((comment) => (
                    <tr>
                      <th scope="row" key={comment.MMTS_ID}>
                        {comment.MMTS_ID}
                      </th>
                      <td onClick={() => test(comment.MMTS_ID)}>
                        {comment.MTS_MP_DISP_VALUE}
                      </td>
                      <td>{comment.MTS_MONTH}</td>
                      <td>{comment.MTS_YEAR}</td>
                      {/* <td>{comment.MTS_DESCRIPTION}</td> */}
                      {/* <td>{comment.MTS_IQAMA}</td> */}
                      <td>{comment.MTS_WORKHOURS}</td>
                      <td>{comment.MTS_TOTAL}</td>
                      <td>{comment.CREATED_DATE}</td>
                      <td>{comment.CREATED_BY}</td>
                      <td>{comment.MTS_STATUS}</td>
                      {/* <td>{comment.MTS_OT_HOURS}</td>
                      <td>{comment.MTS_HR_RATE}</td>
                      <td>{comment.MTS_OT_RATE}</td>
                      <td>{comment.MTS_GRID}</td> */}
                      <td>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon
                            onClick={() => removeMPTimeSheet(comment.MMTS_ID)}
                          />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
        </div>
      {loader}
    </>
  );
};

export default DataTable;