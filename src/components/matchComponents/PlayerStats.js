import React from 'react';
import spells from '../../data/summonerSpells.js';
import champions from '../../data/champions.js'
import Inventory from './Inventory.js';

function addZeroes(input) {
    let num = '' + input
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
}

function round(input) {
    let num = input
    if (num > 9999) {
        num = Math.round(((num + Number.EPSILON)/ 1000) * 10) / 10
        num = num + 'k'
    }
    return num
}

function stats(props) {
    return (
        <div className='flex-display player-stats'>
            <div className='champ-icon-ext'>
                <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champions[props.stats.champ]}.png`}></img>
            </div>
            <div className='spell-container-ext'>
                <div className='spell-ext'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/spell/${spells[props.stats.spell1]}.png`}></img>
                </div>
                <div className='spell-ext'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/spell/${spells[props.stats.spell2]}.png`}></img>
                </div>
            </div>
            <p className='name-ext'>{props.stats.name}</p>
            <div className='flex-display vertical-center kda-ext'>
                <p><strong>{ props.stats.deaths === 0 ? "Perfect": addZeroes(Math.round((((props.stats.kills + props.stats.assists)/props.stats.deaths) + Number.EPSILON) * 100) / 100)} KDA</strong></p>
                <p><strong>{props.stats.kills}/<span className='deaths'>{props.stats.deaths}</span>/{props.stats.assists}</strong></p>
            </div>
            <div className='flex-display vertical-center dmg-ext'>
                <p>Damage:</p>
                <p>{round(props.stats.dmg)}</p>
            </div>
            <div className='flex-display vertical-center vision-score-ext'>
                <p>Vision Score</p>
                <p>{props.stats.visionScore}</p>
            </div>
            <div className='flex-display vertical-center cs-ext'>
                <p>{props.stats.cs} CS</p>
                <p>{addZeroes(Math.round(((props.stats.cs/props.duration*60) + Number.EPSILON) * 100) / 100)} CS/Min</p>
            </div>
            <Inventory inventory={props.stats} ext='-ext' patch={props.patch}/>
            
        </div>
    )
}

export default stats