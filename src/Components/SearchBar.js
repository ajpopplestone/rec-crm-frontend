import React, { Component } from 'react';
import { Input, Button } from 'antd';

const Search = Input.Search;

class SearchBar extends Component {    
    
    render() {
        return (
            <div className="searchBar" >
                <div className="searchNew" >
                    <Button onClick={this.props.newRecord} type="primary">New</Button>
                </div>
                <div className="searchEnter">
                    <Search
                        placeholder="Input search text"
                        value={this.props.value}
                        onChange={e => this.props.updateSearchTerms(e.target.value)}
                        onSearch={term => this.props.fetchData(term)}
                    />
                </div>
                    <Button 
                        icon="close-circle" 
                        onClick={e => this.props.updateSearchTerms(null)}
                        style={{display:"inline-block"}}/>
            </div>
        )
    }
}

export default SearchBar