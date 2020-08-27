import React, { useState } from 'react';
import MainPage from './MainPage.js';
import ProfilePage from './ProfilePage.js';
import "./../css/reset.css";
import "./../css/styles.css";
import Header from './Header.js'
import Footer from './Footer.js';

function App(props) {
    const [search, setSearch] = useState({
        region: '',
        summoner: '',
        loading: true,
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

        fetch(`http://localhost:8888/league/${search.region}/${search.summoner}`) 
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
                        loading: false
                    }
                })
            })
            .catch(error => {
                console.error(`Error fetching the summoner profile (${error})`)
            })
    }

    return (
        <React.Fragment>
            {search.loading ? <MainPage handleChange={event => handleChange(event)} handleClick={event => handleClick(event)}search={search}/> : ''}
            {!search.loading ? <Header handleChange={event => handleChange(event)} handleClick={event => handleClick(event)}search={search}/>: ''}
            {!search.loading ? <ProfilePage profile={profile} history={history} />: ''}
            <Footer />
        </React.Fragment>
    );
}

export default App