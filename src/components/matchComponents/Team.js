import React from 'react';
import champions from '../../data/champions.js'

function shorten(string) {
    if (string.length > 13) {
        return string.slice(0, 10) + "..."
    }

    return string
}

function Team (props) {
    return (
        <div className='team'>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img className='text' src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champions[props.team.top.champ]}.png`}></img>
                </div>
                <p>{shorten(props.team.top.name)}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champions[props.team.jungle.champ]}.png`}></img>
                </div>
                <p>{shorten(props.team.jungle.name)}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'> 
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champions[props.team.mid.champ]}.png`}></img>
                </div>
                <p>{shorten(props.team.mid.name)}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champions[props.team.adc.champ]}.png`}></img>
                </div>
                <p>{shorten(props.team.adc.name)}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champions[props.team.support.champ]}.png`}></img>
                </div>
                <p>{shorten(props.team.support.name)}</p>
            </div>
        </div>
    )
}

export default Team