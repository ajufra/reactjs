/**
   * @jsx React.DOM
 */

//alert("main.js");
var Init = React.createClass({

	getInitialState:function(){
	 	//alert('Init.getInitialState');
	 	return{
			showB: false,
	 		employees: []
	 	}
	 },
	 onClickB: function() {
    	//alert("onClickB");

    	fileExists('myFile.txt',  function(content) {
	        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readFile, fail);
	    }, function() {
	        alert('Error reading files');
	    });


        this.setState({ showB: true, employees: deviceEmployees });
    },

	//componentDidMount: function() {
		//alert('Init.componentDidMount');

		// var _this = this;
		// var scr1 = document.createElement('script');
	 //    scr1.setAttribute('src', "utilities.js");
	 //    document.getElementsByTagName('body')[0].appendChild(scr1);

    	//this.setState({ employees: deviceEmployees });
    //},

   //  componentWillMount: function () {
	  //   alert('Init.componentWillMount');
	  //   this.setState({ employees: emp });
	    
	  // },

	// componentDidMount: function() {
	// 	alert('Init.componentDidMount');
	// 	this.setState({ employees: deviceEmployees, showResults: true });
	// },
	
	render:function(){
		//alert('Init.render.showB = ' + this.state.showB);

		return (
            <div>
                	<button onClick={this.onClickB}>Ingresar</button>
                	<InstantBox data={this.state.employees}/>
                	
                
            </div>
        );
	}
});

//Making the main component, InstantBox
var InstantBox = React.createClass({
	doSearch:function(queryText){
		//get query result
		var queryResult=[];
		this.props.data.forEach(function(person){
			if(person.name.toLowerCase().indexOf(queryText.toLowerCase())!=-1)
			queryResult.push(person);
		});
		
		this.setState({
			query:queryText,
			filteredData: queryResult
		})
	},
	getInitialState:function(){
		
		return{
			query:'',
			filteredData: this.props.data
		}
	},
	render:function(){
		//alert('InstantBox.render');
		return (
			<div className="InstantBox">
				<h2>Instant Search</h2>
				<SearchBox query={this.state.query} doSearch={this.doSearch}/>
				<DisplayTable data={this.state.filteredData}/>
			</div>
		);
	}
});

var SearchBox = React.createClass({
	doSearch:function(){
		var query=this.refs.searchInput.getDOMNode().value; // this is the search text
		this.props.doSearch(query);
	},
	render:function(){
		//alert('SearchBox.render');
		return <input type="text" ref="searchInput" placeholder="Search Name" value={this.props.query} onChange={this.doSearch}/>
	}
});

var DisplayTable = React.createClass({
	render:function(){
		//alert('DisplayTable.render');
		//making the rows to display
		var rows=[];
		this.props.data.forEach(function(person) {
		rows.push(<tr><td>{person.name}</td><td>{person.id}</td></tr>)
		});
		//returning the table
		return(
			 <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Identification</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
		);
	}
});

// var Enter = React.createClass({
//     getInitialState: function() {
//         return { showB: false };
//     },
//     onClick: function() {
//     	//alert("onc");
//         this.setState({ showB: true });
//     },
//     render: function() {
//     	//alert('Enter.render');
//         return (
//             <div>
//                 <button onClick={this.onClick}>Ingresar</button>
//                 { this.state.showB ? <Init /> : null }
//             </div>
//         );
//     }
// });
 
React.renderComponent(<Init />,document.body);