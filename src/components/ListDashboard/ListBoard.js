import './ListBoard.css';

import DashboardView from '../Utilities/DashboardView';

import {useEffect, useState} from 'react';

import axios from 'axios';

function ListBoard(props){


    return(
        <div>

            <div className="list-div">
            {props.datas.map((ab)=>{
                    return <div>
                        <DashboardView name={ab.name} description={ab.description} users={ab.users} admins={ab.admins}/> 
                        </div>                   
                })
                }
            </div>
        </div>
    )
}

export default ListBoard;