import React from 'react';
import './table.css';

class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {
                "columnHeaders": [
                    {
                    "id": "firstName",
                    "label": "First Name",
                    "sortable": "true",
                    "filterable": "true"
                    },
                    {
                    "id": "lastName",
                    "label": "Last Name",
                    "sortable": "true",
                    "filterable": "false"
                    },
                    {
                    "id": "dateOfBirth",
                    "label": "Date of Birth",
                    "sortable": "false",
                    "filterable": "true"
                    },
                    {
                    "id": "designation",
                    "label": "Designation",
                    "sortable": "true",
                    "filterable": "true"
                    },
                    {
                    "id": "department",
                    "label": "Department",
                    "sortable": "true",
                    "filterable": "true"
                    }
                ],
                "rowData": [
                    {
                        "id": "user_id_1",
                        "data": [
                            {
                            "id": "firstName",
                            "value": "John"
                            },
                            {
                            "id": "lastName",
                            "value": "Smith"
                            },
                            {
                            "id": "dateOfBirth",
                            "value": "07-11-1992"
                            },
                            {
                            "id": "designation",
                            "value": "Software Engineer"
                            },
                            {
                            "id": "department",
                            "value": "Web"
                            }
                        ]
                    },
                    {
                    "id": "user_id_2",
                        "data": [
                            {
                            "id": "firstName",
                            "value": "Jane"
                            },
                            {
                            "id": "lastName",
                            "value": "Doe"
                            },
                            {
                            "id": "dateOfBirth",
                            "value": "07-11-1996"
                            },
                            {
                            "id": "designation",
                            "value": "Intern"
                            },
                            {
                            "id": "department",
                            "value": "Mobile"
                            }
                        ]
                    },
                    {
                        "id": "user_id_3",
                            "data": [
                                {
                                "id": "firstName",
                                "value": "pranay"
                                },
                                {
                                "id": "lastName",
                                "value": "kumar"
                                },
                                {
                                "id": "dateOfBirth",
                                "value": "07-11-1995"
                                },
                                {
                                "id": "designation",
                                "value": "analist"
                                },
                                {
                                "id": "department",
                                "value": "Laptop"
                                }
                            ]
                    },
                    {
                    "id": "user_id_4",
                        "data": [
                            {
                            "id": "firstName",
                            "value": "Yogesh"
                            },
                            {
                            "id": "lastName",
                            "value": "Singh"
                            },
                            {
                            "id": "dateOfBirth",
                            "value": "12-01-1990"
                            },
                            {
                            "id": "designation",
                            "value": "Lead Engineer"
                            },
                            {
                            "id": "department",
                            "value": "UI"
                            }
                        ]
                    }
                ]
            },
            userRecords : [],
            flag : false,
            toggle : false,
            sortable : true,
            filteredRecords : [],
            filterFlag : false
        }
        this.inputBoxRef = React.createRef();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.filteredRecords !== this.state.filteredRecords){
            if(this.inputBoxRef.current.value){
                this.setState({userRecords : this.state.filteredRecords});
            }
        }
    }
    getHeadingNames = (userDetails) =>{
        var columnHeading =[];
        userDetails.forEach((field) =>{
            columnHeading.push(field.id);
        })
        return columnHeading;
    }
    sortColumn = (event) =>{
        let columnHeadersData = this.state.data.columnHeaders;
        let sortingKey = event.target.innerHTML.toLowerCase();
        columnHeadersData.forEach((item) =>{
            if(item.id.toLowerCase() === sortingKey){
                if(JSON.parse(item.sortable)){
                    if(!this.state.toggle){
                        this.setState({userRecords : this.state.userRecords.sort(),toggle : !this.state.toggle});
                    }
                    else{
                        this.setState({userRecords : this.state.userRecords.sort().reverse(),toggle : !this.state.toggle});
                    }
                    
                }
                else{
                    return false;
                }
            }
        });
    }
    getTableHeading = ()=>{
        let headingNames = this.getHeadingNames(this.state.data.rowData[0].data);
        return headingNames.map((heading, index) =>{
            return <th onClick={this.sortColumn} key={heading} style={{paddingRight:'25px',border:'1px solid',fontWeight:'bold',cursor:'pointer'}}>{heading.toUpperCase()}</th>
        });
    }
    renderContent = () =>{
        let totalList = [];
        this.state.data.rowData.forEach((user) =>{
            let userList = [];
            user.data.forEach((field) =>{
                userList.push(field.value);
            });
            totalList.push(userList);
        });
        if(!this.state.flag){
            this.setState({userRecords: totalList,flag: !this.state.flag});
        }
    }
    displayTableBody = (item,id) =>{
        return (
            <tr key={item[id]}>
                {item.map((subUserItem) =>{
                    return <td key={subUserItem} style={{paddingRight:'25px',border:'1px solid'}}>{subUserItem}</td> 
                })}
            </tr>
        )
    }
    searchContent = (event) =>{
        let results = [];
        let columnHeadersData = this.state.data.columnHeaders;
        if(event.target.value.length >=2 ){
            for(let i=0; i<this.state.data.rowData.length; i++) {
                this.state.data.rowData[i].data.forEach((listItem)=>{
                    if(listItem.value){
                        if(listItem.value.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1) {
                            results.push(listItem.id);
                        }  
                    }
                });
            }
        }
        let filteredRecords = [];
        if(!this.state.filterFlag){
            filteredRecords = [...this.state.filteredRecords,...this.state.userRecords];
            this.setState({filteredRecords: filteredRecords, filterFlag : true});
        }
        if(event.target.value.length >= 2){
            columnHeadersData.forEach((item) =>{
                if(results[0]){
                    if(item.id.toLowerCase() === results[0].toLowerCase()){
                        if(JSON.parse(item.filterable)){
                            let filteredResults = this.state.userRecords.filter(item => new RegExp(`${event.target.value}`, "i").test(item));
                            this.setState({userRecords : filteredResults});
                        }
                    }
                }
            });
        }else if(event.target.value.length){
            this.setState({userRecords : this.state.filteredRecords});
        }
    }
    render(){
        return(
            <div style={{paddingTop:'15px',paddingLeft:'20px'}}>
                <div className="searchbar">
                    <form autoComplete="off">
                        <input type="text" id="searchbox" onKeyUp={this.searchContent}  placeholder="Enter table data to filter" name="search" ref={this.inputBoxRef}/>
                    </form>
                </div>
                <table style={{border:'1px solid',marginTop : '15px'}}>
                    <thead>
                        <tr>
                            {this.getTableHeading()}                            
                        </tr>
                    </thead>
                    <tbody style={{border:'1px solid'}}>
                       {this.renderContent()}
                       {this.state.userRecords.map((singleUser,index)=>{
                           return this.displayTableBody(singleUser,index);
                       })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Table;