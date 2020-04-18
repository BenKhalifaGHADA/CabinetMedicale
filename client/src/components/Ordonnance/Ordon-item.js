import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {deleteOrdonnance} from '../../actions/ordonnanceAction';
const OrdonItem =({item,index,deleteOrdonnance,consultId})=>{
console.log(item)
    return(<Fragment>
        <tr >
          <td className="text-center text-muted">{index++}</td>
          <td>
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left flex2">
                  <div className="widget-heading">
                    {/* <p type="text" name="drug" value={drug} disabled /> */}
                    <p>{item.drug}</p>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>
            <p>{item.dose}</p>
          </td>
          <td>
            {/* <p type="text" value= name="duration" disabled /> */}
            <p>{item.duration}</p>
          </td>
          <td className="text-center">
            <button
              className="fa fa-minus"
              onClick={() => deleteOrdonnance(consultId,{id:item._id})} 
            ></button>
          </td>
        </tr>
    </Fragment>)
}

OrdonItem.propTypes = {
   deleteOrdonnance: PropTypes.func.isRequired,
  };
export default connect(null,{deleteOrdonnance})(OrdonItem);