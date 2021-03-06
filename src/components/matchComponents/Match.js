import React, {useState, useEffect} from 'react';
import loadable from "@loadable/component";

const LoadableMatchDisplay = loadable(()=> import('./MatchDisplay'))

function Match(props) {
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        // http://localhost:8888/match/na1/matchId/3533889677
        fetch(`https://lol-stat-tracker-project.herokuapp.com/match/${props.region}/matchId/${props.id}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`)
                } 
                return response.json()
            })
            .then(response => {
                setInfo(response)
                setLoading(false)
            })
            .catch(error => {
                console.error(`Error occured fetching match id ${props.id} (${error})`)
            })
    },[props.id])

    return (
        <React.Fragment>
            {!loading ? <LoadableMatchDisplay 
                duration={info.gameDuration}
                mode={info.gameMode}
                champ={props.data.champion}
                data={info}
                name={props.name}
            /> : ''}
        </React.Fragment>
    )
}

export default Match