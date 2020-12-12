import React, { useState } from 'react';
import "./../css/reset.css";
import "./../css/styles.css";
import Header from './Header.js'
import Footer from './Footer.js';

import loadable from "@loadable/component";

const LoadableMainPage = loadable(()=> import('./MainPage'))
const LoadableProfilePage = loadable(()=> import('./ProfilePage'))
const LoadableHeader = loadable(()=> import('./Header'))
const LoadableFooter = loadable(()=> import('./Footer'))

function App() {

    const [search, setSearch] = useState({
        region: '',
        summoner: '',
        loading: true,
        validityMessage: '',
    });

    const [profile, setProfile] = useState({});

    function updateProfile(data) {
        setProfile(prev => {
            return {
                ...prev,
                region: search.region,
                summoner: data.name,
                profileIconId: data.profileIconId,
                level: data.summonerLevel,
                accId: data.accountId,
                summId: data.id,

            }
        })
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setSearch(prevSearch => {
            return {
                ...prevSearch,
                [name]: [value]
            }
        })
    };

    function handleClick(event) {
        event.preventDefault();
        
        fetch(`https://lol-stat-tracker-project.herokuapp.com/league/${search.region}/${search.summoner}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`)
                } 
                return response.json()
            })
            .then((response)=> {
                updateProfile(response)
                setSearch(prevSearch => {
                    return {
                        ...prevSearch,
                        loading: false,
                        validityMessage: ''
                    }
                })
            })
            .catch(error => {
                console.error(`Error fetching the summoner profile (${error})`)
                setSearch(prevSearch => {
                    return {
                        ...prevSearch,
                        loading: false,
                        validityMessage: 'error'
                    }
                })
            })
    }

    return (
        <React.Fragment>
            {search.loading ? <LoadableMainPage key="mainpage" handleChange={event => handleChange(event)} handleClick={event => handleClick(event)}search={search}/> : ''}
            {!search.loading ? <LoadableHeader handleChange={event => handleChange(event)} handleClick={event => handleClick(event)}search={search} />: ''}
            {!search.loading ? <LoadableProfilePage profile={profile} history={history} search={search}/>: ''}
            <LoadableFooter />
        </React.Fragment>
    );
}

export default App