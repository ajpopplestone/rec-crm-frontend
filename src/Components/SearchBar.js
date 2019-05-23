import React, { Component } from 'react';
import { Input, Button } from 'antd';

const Search = Input.Search;

class SearchBar extends Component {    
    handleResetSeachTerms = () => {
        this.props.updateSearchTerms(null)
        this.props.fetchData()
    }


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
                        onSearch={this.props.fetchData}
                    />
                </div>
                    <Button 
                        icon="close-circle" 
                        onClick={this.handleResetSeachTerms}
                        style={{display:"inline-block"}}/>
            </div>
        )
    }
}

export default SearchBar