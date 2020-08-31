import React from 'react';
import shields from '../../functions/rankShields.js'

function RankDisplay(props) {
    return (
        <div className='flex-display rank-container'>
            <div className='rank-shield'><img src={! props.unranked ? shields[props.rank.tier] : shields['UNRANKED']}></img></div>
            <div className='flex-display vertical-center rank-stats'>
                <p>{props.solo ? 'Ranked Solo': ' Ranked Flex'}</p>
                {!props.unranked ? <React.Fragment>
                    <p><strong>{props.rank.tier} {props.rank.division}</strong></p>
                    <p>LP: {props.rank.lp}</p>
                    <p>Wins: {props.rank.wins} Losses {props.rank.losses}</p>
                    <p>Winrate: {Math.round(props.rank.wins/(props.rank.wins + props.rank.losses) * 100)}%</p>
                </React.Fragment>: <p>Unranked</p>}
            </div>
        </div>
    )
}

export default RankDisplay