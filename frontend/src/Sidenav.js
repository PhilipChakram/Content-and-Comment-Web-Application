import React from 'react';
import { Link } from 'react-router-dom';



export default function Sidenav ({data}) {
  return(
        <div className="col-sm-3 sidenav">
          <h4>Philips Blog</h4>
          <ul className="nav nav-pills nav-stacked">
              {data.map(({name},index)=>{
                return <Link to={`/${name}`} key={index}><li>{name}</li></Link>
              })}
          </ul><br/>
        </div>
    );
}