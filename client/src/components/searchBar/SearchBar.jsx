import React from "react";
import { connect } from "react-redux";
import { searchName, deleteDogs } from "../../redux/actions/actions";
import style from './SearchBar.module.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.sate={
            searchName: ''
        };
        this.timer = null
    }

    handlerName(element){
        element.preventDefault();
        this.setState({ searchName: element.target.value })
        this.props.setPage(1);
        this.props.deleteDogs();

        this.timer && clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.props.searchName(element.target.value);
        }, 600);
    }

    render(){
        return(
            <>
                <input type="text" onChange={element => this.handlerName(element)} placeholder="Search some breed..." className={style.searchbar}/>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        searchName: (name) => {
            dispatch(searchName(name))
        },
        deleteDogs: () => {
            dispatch(deleteDogs())
        }
    }
}


export default connect(null, mapDispatchToProps)(SearchBar);