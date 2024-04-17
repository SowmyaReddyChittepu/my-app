import React from "react";
//import CustomTable from "./Table";
import {getLocations }from "./mock-api/apis"
import { styled } from '@mui/material/styles';
import {Table} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
 import TableRow from '@mui/material/TableRow';
 import Paper from '@mui/material/Paper';

let locations =[];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width:50,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border:  1,
  },
}));

 async function getData() {
  try {
    // Assuming fetchData returns a Promise
    const data = await getLocations();
    // Do something with the data
    console.log("locations",data);
  
    formData(data);
   
  } catch (error) {
    // Handle any errors
    console.error('Error fetching data:', error);
    
  }
}

function formData(dara){
 
if(dara){
  dara.map((d,i)=>{locations.push({ value: i, label: d })})
}
} 
getData();


console.log("locations _after",locations);
export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            data:{},
            location:'',
            selectedValue:'',
            hasError:'false',
            rows:[],
            names:[],
            errorMsg:''
        };
    }
   
   updateList =(name) =>{
    this.setState({names:[...this.state.names,name]});
   };
   
    handleChange=(event) => {
     
        this.setState({name: event.target.value,
    });
    
      };
      handleDropdown=(event)=>{
        this.setState({location:event.target.value});
      }
      addRow=()=>{
        this.updateList(this.state.name); 
        //const existingName = (this.state.names.length>1 ) ? this.state.names.find(item => item === this.state.name): false;
        console.log("existing name",this.state.names);
        const string =  this.state.names.includes(this.state.name);
        if(!string){
         
        this.setState({
          rows :[...this.state.rows,{
                name : this.state.name,
                location : this.state.location,}
          ],
          errorMsg:''
        })
      }
      else{
        this.setState({
         errorMsg:'This name  is already been taken'
        })
        }
      }
    clearData=()=>{
      this.setState({
        rows :[],
        names:[]
      })
      
    }
    render(){
    //ToDo: Styles should import from   
        return(<div>
          <div style={{"margin":"2%"}}>
          <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange} style={{"margin-left":"4%","width":"44%"}}/>
        </label>
        <div style={{"color":"red","margin-left":"8%"}}> {this.state.errorMsg}</div>
        
          </div>
          
       <div style={{"margin":"2%"}}>
        
          <span>
          <label>Locations:</label>
          <select id="mySelect" value={this.state.location} onChange={this.handleDropdown} style={{"margin-left":"2%","width":"45%","margin-bottom":"6%"}}>
          <option value="">None</option>
           {locations.map(option => (
            <option key={option.value} value={option.label}>{option.label}</option>
          ))}
        </select>
   
          </span>
      
       
        </div>
        <div style={{"margin-left":"44%"}}>
          <span>
         <button type="button" onClick={this.clearData}>Clear</button>
         <button type="button" onClick={this.addRow} style={{"margin-left":"2%"}}>Add</button>

          </span>
      
        </div>
        <TableContainer component={Paper} style={{"margin":"2%","width":"50%"}}>
              <Table sx={{ minWidth: 500}} aria-label="customized table">
                <TableHead style={{"backgroundColor":"darkgrey"}}>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Location</StyledTableCell>
                    
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows.length>0 && this.state.rows.map((row) => (
                   
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.location}</StyledTableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            </div>);
    }

};