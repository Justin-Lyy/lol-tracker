import React, {useState, useEffect} from 'react';
import Match from './Match.js';

function MatchHistory(props) {
    let matchIds = []
    const [matchObjs, setMatchObjs] = useState()

    useEffect(()=> {
        matchIds = props.history.map((match) => match.gameId)
        
        let placeHolder = matchIds.map((id, index) => {
            
            return <Match key={`${props.name}:${id}`} id={id} name={props.name} region={props.region} data={props.history[index]}/>
        })

        setMatchObjs(placeHolder)
    },[props.history])

    return (
        <div className='match-history'>
            <div className='title'><h1>Match History:</h1></div>
            {matchObjs}
        </div>

    );
}

export default MatchHistory

