import React, {useState, useEffect} from 'react';
import MatchHistory from './matchComponents/MatchHistory.js'
import Profile from './Profile.js'
import Rank from './rankComponents/Rank.js'

function ProfilePage (props) {
    let [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([]) 

    useEffect(()=> {
        // /history/:region/accId/:accountId
        fetch(`http://localhost:8888/history/${props.profile.region}/accId/${props.profile.accId}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                } 
                return response.json()
            })
            .then(response => {
                setHistory(response.slice(0,20))
                setLoading(false)
            })
            .catch(error => {
                console.error(`Error fetching the match history ${error}`)
            })

        
    },[props.profile])

    return (
        <div className='profile-page'>
            <Profile profile={props.profile}/>
            <div className='flex-display inner-container'>
                <Rank profile={props.profile}/>
                {!loading ? <MatchHistory history={history} region={props.profile.region} name={props.profile.summoner}/>: <h1>Please hold on</h1>}
            </div>
        </div>
    );
}

export default ProfilePage