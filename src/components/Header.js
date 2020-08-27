import React from 'react';

function Header (props) {
    return (
        <header className='header'>
            <form>
                <input 
                    className='search-box' 
                    input='text' 
                    name='summoner' 
                    placeholder='summoner name'
                    onChange={event => props.handleChange(event)}
                    value={props.search.summoner}
                />
                <select name="region" onChange={event => props.handleChange(event)} className='region-select'>
                    <option value="n/a">Region</option>
                    <option value="na1">NA</option>
                    <option value="kr">KR</option>
                    <option value="eun1">EUN</option>
                    <option value="euw1">EUW</option>
                    <option value="oc1">OC</option>
                    <option value="jp1">JP</option>
                </select>
                <button click='button' onClick={event => props.handleClick(event)} className='search-button'>Search</button>
            </form>
        </header>
    )
}

export default Header