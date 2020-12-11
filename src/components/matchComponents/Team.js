import React from 'react';
import champions from '../../data/champions.js'

function Team (props) {
    return (
        <div className='team'>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img className='text' src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${champions[props.team.top.champ]}.png`}></img>
                </div>
                <p>{props.team.top.name}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${champions[props.team.jungle.champ]}.png`}></img>
                </div>
                <p>{props.team.jungle.name}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'> 
                    <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${champions[props.team.mid.champ]}.png`}></img>
                </div>
                <p>{props.team.mid.name}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${champions[props.team.adc.champ]}.png`}></img>
                </div>
                <p>{props.team.adc.name}</p>
            </div>
            <div className='flex-display'>
                <div className='champion-small'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${champions[props.team.support.champ]}.png`}></img>
                </div>
                <p>{props.team.support.name}</p>
            </div>
        </div>
    )
}

export default Team