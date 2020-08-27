import React, {useState, useEffect} from 'react';
import RankDisplay from './RankDisplay.js';

const rankObject = (rank) => {
    return {
        tier: rank.tier,
        division: rank.rank,
        lp: rank.leaguePoints,
        wins: rank.wins,
        losses: rank.losses,
    }
}

function Rank (props) {
    const [rankSolo, setRankSolo] = useState()
    const [rankFlex, setRankFlex] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // /rank/:region/summonerId/:summonerId
        fetch(`http://localhost:8888/rank/${props.profile.region}/summonerId/${props.profile.summId}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`)
                } 
                return response.json()
            })
            .then(response => {
                if (response.length === 0) {
                    setRankSolo()
                    setRankFlex()
                } else if (response.length === 1) {
                    response[0].queueType === 'RANKED_SOLO_5x5' ? setRankSolo(rankObject(response[0])) : setRankSolo()  
                    response[0].queueType === 'RANKED_FLEX_SR' ? setRankFlex(rankObject(response[0])) : setRankFlex()
                } else if (response.length === 2) {
                    response.forEach(rank => {
                        rank.queueType === 'RANKED_SOLO_5x5' ? setRankSolo(rankObject(rank)) : setRankSolo(prev => prev)  
                        rank.queueType === 'RANKED_FLEX_SR' ? setRankFlex(rankObject(rank)) : setRankFlex(prev => prev)
                    });
                }

                setLoading(false)
            })
            .catch(error => {
                console.error(`Error occured fetching the players ranked stats (${error})`)
            })
    }, [props.profile])
    
    return (
        <div className='rank'>
            <h2 className='title'>Rank</h2>
            <div className='rank-outer-container'>
                {!loading && rankSolo ?  <RankDisplay rank={rankSolo} solo={true} unranked={false}/>: 
                <RankDisplay rank={rankSolo} solo={false} unranked={true}/>}
                {!loading && rankFlex ? <RankDisplay rank={rankFlex} solo={false} unranked={false}/>:
                <RankDisplay rank={rankFlex} solo={false} unranked={true}/>}
            </div>
        </div>
    )
}

export default Rank