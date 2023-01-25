import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './index.css';

import { pexelsAPI } from '../../services/api';

const Search = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        images: [],
        searchedText: "",
        searchText: ""
    });

    useEffect(() => {
        console.log('useEffect()');

        const { query } = location.state;

        pexelsAPI.search({ query }).then(response => {
            console.log('response', response);
            
            const { status, data } = response;
            if(status === 200){
                let { images } = state;
                let { photos } = data;

                images = photos.map(d => d.src.original);

                setState({
                    ...state,
                    images,
                    searchedText: query,
                });
            }
        });
    }, []);

    const changeSearchText = (s) => {
        console.log('changeSearchText()');

        setState({
            ...state,
            searchText: s
        });
    }

    const search = () => {
        console.log('search()');

        const { searchText } = state;
        if(searchText !== ""){
            pexelsAPI.search({ query: searchText }).then(response => {
                console.log('response', response);
                
                const { status, data } = response;
                if(status === 200){
                    let { images } = state;
                    let { photos } = data;
    
                    images = photos.map(d => d.src.original);
    
                    setState({
                        ...state,
                        images,
                        searchedText: searchText,
                    });
                }
            });
        }
    }

    return(
        <div className={"container"}>
            <input 
                className={"input-search"} 
                type={"text"} 
                placeholder={"Search"} 
                onChange={(e) => changeSearchText(e.target.value)} 
                value={state.searchText} 
                onKeyDown={(e) => e.key === "Enter" && search()}/>
            <h3>You searched for: {state.searchedText}</h3>
            <div className={"container-images"}>
                { state.images.map(d => <img src={d} /> ) }
            </div>
        </div>
    );
}

export default Search;