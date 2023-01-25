import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

import { pexelsAPI } from '../../services/api';

const Home = () => {

    const navigate = useNavigate();
    const [state, setState] = useState({
        images:[],
        selectedSearch: "Mountain",
        searchText: "",
    });

    useEffect(() => {
        console.log("useEffect()");
        
        const { selectedSearch } = state;

        pexelsAPI.search({ query: selectedSearch }).then(response => {
            console.log('response', response);

            const { status, data } = response;
            if(status === 200) {
                let { images } = state;
                let { photos } = data;

                images = photos.map(d => d.src.original);

                setState({
                    ...state,
                    images
                });
            }
        });
    }, [state.selectedSearch]);

    const updatePreset = (s) => {
        console.log('updatePreset()');

        setState({
            ...state,
            selectedSearch: s
        });
    }

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
            navigate("/search", {
                state:{
                    query: state.searchText
                }
            });
        }
    }

    return (
        <div className={"container"}>
            <input 
                className={"input-search"} 
                type={"text"} 
                placeholder={"Search"} 
                onChange={(e) => changeSearchText(e.target.value)} 
                value={state.searchText} 
                onKeyDown={(e) => e.key === "Enter" && search()}/>
            <div className={"search-preset"}>
                <button onClick={(e) => updatePreset("Mountain")}>Mountain</button>
                <button onClick={(e) => updatePreset("Beaches")}>Beaches</button>
                <button onClick={(e) => updatePreset("Birds")}>Birds</button>
                <button onClick={(e) => updatePreset("Food")}>Food</button>
            </div>
            <h2>{ state.selectedSearch } Pictures</h2>
            <div className={"container-images"}>
                { state.images.map(d => <img src={d} /> ) }
            </div>
        </div>
    );
}

export default Home;