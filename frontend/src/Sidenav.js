import React, { Component } from 'react';

class Sidenav extends Component {

	render(){
		const data = this.props.data;
    console.log(data);
		return(
			     <div className="col-sm-3 sidenav">

              <h4>Philips Blog</h4>
              <ul className="nav nav-pills nav-stacked">
                  {data.map(({name},index)=>{
                    return <li key={index}><a href="#" key={index}>{name}</a></li>
                  })}
              </ul><br/>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Blog.."></input>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>

            </div>
		);
	}
}

export default Sidenav