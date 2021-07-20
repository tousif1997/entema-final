import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from './MiniCardComponent';
import { FaUsers  } from 'react-icons/fa';
import {BsBlockquoteRight} from 'react-icons/bs'
import {RiUserSettingsFill} from 'react-icons/ri';
import {GoCalendar} from 'react-icons/go'
import { BiPurchaseTag  } from 'react-icons/bi';
const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});

function DashboardComponent() {
  
    const classes = useStyles();
const test=()=>{
    alert('hurrrrrrrrry');
}

    return (<>
        <div className  ="scrollbar square scrollbar-lady-lips thin">

      <div className='container'>
      <div className="heading-layout1">
      <div className="item-title">
          <h3 style={{ padding: "50px" }}>Dashboard</h3>
      </div>
  </div>



        <Column>
                       <div className='row' style={{marginLeft:'50px'}}>
                               <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Users'
                        value='10'
                        icon={<FaUsers/>}
                         onClick={test}        
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Vendors'
                        value='16'
                        icon={ <RiUserSettingsFill />}

                    />
                 
              
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Clients '
                        value='43'
                      icon={ <img src='client.png' style={{width:'40px',color:'black'}} alt="logo"/>}
                    />  </div>



                    <div className='row' style={{marginTop:'30px',marginLeft:'50px'}}>
                    <MiniCardComponent
                        className={classes.miniCardContainer}                                      
                        title='Purchase '
                        value='64'
                        icon= {<BiPurchaseTag />}
                    />
                  
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Quotation'
                        value='43'
                      icon={<BsBlockquoteRight />}
                      
                    />  
                    <MiniCardComponent
                        className={classes.miniCardContainer}                                      
                        title='Time Sheet'
                        value='64'
                        icon= {<GoCalendar/>}
                    />
                    </div>
                    <div className='row'style={{marginTop:'30px',marginLeft:'50px',marginBottom:'50px' ,width:'298px'}}>
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='ManPower'
                        value='43'
                      icon={  <img src="manpower.png"  style={{width:'40px',color:'white'}} alt="logo"/>}
                    />
                    </div>
              
          
           
        </Column>
        </div>
        </div></>
    );
}

export default DashboardComponent;