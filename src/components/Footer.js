import React from 'react'

function Footer (props) {
    return (
        <footer className='flex-display '>
            <p>LOL Tracker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games 
                or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties
                are trademarks or registered trademarks of Riot Games, Inc.</p>
            <React.Fragment>
                <p>Built Using the Riot Games API https://developer.riotgames.com/</p>
                <p>Developed by https://github.com/Justin-Lyy</p>
            </React.Fragment>
        </footer>
    )
}

export default Footer