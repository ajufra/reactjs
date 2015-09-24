 /**
   * @jsx React.DOM
 */


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
		return <input type="text" ref="searchInput" placeholder="Search Name" value={this.props.query} onChange={this.doSearch}/>
	}
});

var DisplayTable = React.createClass({
	render:function(){
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
 
React.renderComponent(<InstantBox data={employees}/>,document.body);

alert('Init app!');

fileExists('myFile.txt',  function() {
	alert('Exist');
}, function() {
	alert('Doesn\'t exist');
});

writeFile('myFile.txt', 'Lorem ipsum dolor...', function() {
	alert('Success');
}, function() {
	alert('Error');
});