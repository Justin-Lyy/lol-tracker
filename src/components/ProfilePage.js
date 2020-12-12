import React, {useState, useEffect} from 'react';
import loadable from "@loadable/component";

const LoadableMatchHistory = loadable(()=> import('./matchComponents/MatchHistory'))
const LoadableProfile = loadable(()=> import('./Profile'))
const LoadableRank = loadable(()=> import('./rankComponents/Rank'))

function ProfilePage (props) {
    let [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([]) 

    useEffect(()=> {
        setLoading(true)
        if (!props.search.validityMessage) {
            // /history/:region/accId/:accountId
            fetch(`https://lol-stat-tracker-project.herokuapp.com/history/${props.profile.region}/accId/${props.profile.accId}`) 
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
        }
    },[props.search.validityMessage, props.profile])

    return (
        <React.Fragment>
            {!props.search.validityMessage ? 
            <div className='profile-page'>
                <LoadableProfile profile={props.profile}/>
                <div className='flex-display inner-container'>
                    <LoadableRank profile={props.profile}/>
                    {!loading ? <LoadableMatchHistory history={history} region={props.profile.region} name={props.profile.summoner}/>: <h1>Please hold on</h1>}
                </div>
            </div>: 
            <div className='error-page'>
                <h1>We couldn't find the player you were looking for</h1>
                <p>Maybe try checking your spelling? Or maybe you selected the wrong server? </p>
            </div>}
        </React.Fragment>
    );
}

export default ProfilePage