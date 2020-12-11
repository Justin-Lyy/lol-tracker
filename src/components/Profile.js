import React from 'react';

function Profile(props) {
    return (
        <div className='flex-display main-profile'>
            <div className='profile-picture'>
                <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/${props.profile.profileIconId}.png`} alt="a summoner icon"></img>
            </div>
            <div className='flex-display profile-info'>
                <h1>{props.profile.summoner}</h1>
                <p>Level: {props.profile.level}</p>
            </div>
        </div>
    );
}

export default Profile 