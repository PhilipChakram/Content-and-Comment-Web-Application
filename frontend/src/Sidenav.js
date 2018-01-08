import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidenav extends Component {

	render(){
		const {data} = this.props;
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
}

export default Sidenav