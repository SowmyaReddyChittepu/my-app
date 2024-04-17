import React from "react";
import CustomTable from "./Table";

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            dropdown:['abc','123']
        };

    }
    handleChange=(event) => {
        this.setState({name: event.target.value});
      };
    render(){
        return(<div>
            <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <div>
        <label>
            Location:
            <select value={this.setState.dropdown} ></select>
        </label>
        </div>
         <span><button>clear</button><button>Add</button></span>
         <CustomTable></CustomTable>
            </div>);
    }

};