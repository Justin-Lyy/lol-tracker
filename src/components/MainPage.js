import React from 'react';

function MainPage (props) {
    return (
        <div className='main-page'>
            <h1>LOL Tracker</h1>
            <form onSubmit={event => props.handleClick(event)}>
                <input 
                    className='search-box'
                    input='text' 
                    name='summoner' 
                    placeholder='summoner name'
                    onChange={event => props.handleChange(event)}
                    value={props.search.summoner}
                    required={true}
                    autoComplete='off'
                />
                <select name="region" 
                    onChange={event => props.handleChange(event)} 
                    className='region-select' 
                    required={true}
                >
                    <option value="n/a">Region</option>
                    <option value="na1">NA</option>
                    <option value="kr">KR</option>
                    <option value="eun1">EUN</option>
                    <option value="euw1">EUW</option>
                    <option value="oc1">OC</option>
                    <option value="jp1">JP</option>
                </select>
                <button click='button' type='button' onClick={event => props.handleClick(event)} className='search-button'>Search</button>
            </form>
        </div>
    )
}

export default MainPage;

