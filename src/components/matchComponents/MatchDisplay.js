import React , {useState, useEffect } from 'react';
import spells from '../../data/summonerSpells.js';
import sortTeams from '../../functions/sortTeams.js'
import PlayerStats from './PlayerStats.js';
import Team from './Team.js';
import champions from '../../data/champions.js'
import Inventory from './Inventory.js';

function addZeroes(input) {
    if (input == 'Infinity') {
        return 'Perfect'
    }

    let num = '' + input
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }

function MatchDisplay(props) {
    let data = props.data
    let id = data.participantIdentities.findIndex(identity => {
        return identity.player.summonerName === props.name
    })

    const [playerStats, updateStats] = useState({})
    const [redTeam, updateRedTeam] = useState()
    const [blueTeam, updateBlueTeam] = useState()
    const [loading, updateLoading] = useState(true)
    const [extend, updateExtension] = useState(false)

    function getTeams() {
        let sortedTeams = sortTeams(data)
        updateBlueTeam(sortedTeams.blue)
        updateRedTeam(sortedTeams.red)
    }

    // can rewrite to use the team arrays instead 
    function getStats() {
        updateStats({
            ...data.participants[id],
            kda: addZeroes(Math.round((((data.participants[id].stats.kills + data.participants[id].stats.assists)/data.participants[id].stats.deaths) 
            + Number.EPSILON) * 100) / 100)
        })
    }

    function handleClick(event) {
        updateExtension(prev => !prev)
        event.target.classList.toggle('arrow-down')
        event.target.classList.toggle('arrow-up')
    }

    useEffect(() => {
        updateLoading(true)
        getStats()
        getTeams()
        updateLoading(false)

    },[props.duration])

    // #08A6FF win
    // #FF4E50 lose

    return (
        <React.Fragment>
            {!loading ? <div className='flex-display match' style={{backgroundColor: playerStats.stats.win ? '#A9CFDD' : '#E89D99'}}>
                <div className='game-info-basic flex-display vertical-center'>
                    <h3>{props.mode}</h3>
                    <p>{Math.floor(props.duration / 60)}:{(props.duration - (Math.floor(props.duration / 60) * 60))}</p>
                    <p>{playerStats.stats.win ? 'Victory' : 'Defeat'}</p>
                </div>
                <div className='champion flex-display vertical-center'>
                    <div className='champ-icon'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/${champions[props.champ]}.png`}></img>
                    </div>
                    <p>{champions[props.champ]}</p>
                </div>
                <div className='spell-container flex-display'>
                    <div className='spell'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/spell/${spells[playerStats.spell1Id]}.png`}></img>
                    </div>
                    <div className='spell'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/spell/${spells[playerStats.spell2Id]}.png`}></img>
                    </div>
                </div>
                <div className='kda-container flex-display vertical-center'>
                    <p><strong>{playerStats.stats.kills}/<span className='deaths'>{playerStats.stats.deaths}</span>/{playerStats.stats.assists}</strong></p>
                    <p style={{color: playerStats.kda > 3 || playerStats.kda === 'Perfect' ? playerStats.kda > 5 || playerStats.kda === 'Perfect' ? '#FE5607': '#0C9153': 'black'}}><strong>{playerStats.kda} KDA</strong></p>
                </div>
                <div className='basic-player-info flex-display vertical-center'>
                    <p>Level {playerStats.stats.level}</p>
                    <p>{playerStats.stats.totalMinionsKilled + playerStats.stats.neutralMinionsKilled} 
                    ({addZeroes(Math.round((((playerStats.stats.totalMinionsKilled + playerStats.stats.neutralMinionsKilled)/props.duration*60) + Number.EPSILON) * 100) / 100)}) CS</p>
                    <p>Vision Score: {playerStats.stats.visionScore}</p>
                </div>
                <Inventory inventory={playerStats.stats} ext={''}/>
                <div className='flex-display team-rosters'>
                    <Team team={blueTeam}/>
                    <Team team={redTeam}/>
                </div>
                <div className='side-bar' style={{backgroundColor: playerStats.stats.win ? '#08A6FF' : '#FF4E50'}}>
                    <div onClick={(event) => handleClick(event)} className='arrow-down'></div>
                </div>
            </div> : ''}
            {(!loading && extend) ? <div className='extension'>
                <div className='player-stat-container' style={{backgroundColor: data.teams[0].win === 'Fail' ? '#EEC5C6' : '#DDF0F7'}}>
                    <div className='flex-display team-stats' style={{backgroundColor: data.teams[0].win === 'Fail' ? '#FF4E50' : '#08A6FF'}}>
                        <p>Blue Team ({data.teams[0].win === 'Fail' ? 'Defeat': 'Victory'})</p>
                        <p>Dragons: {data.teams[0].dragonKills}</p>
                        <p>Barons: {data.teams[0].baronKills}</p>
                        <p>Towers: {data.teams[0].towerKills}</p>
                    </div>
                    <PlayerStats stats={blueTeam.top} duration={props.duration}/>
                    <PlayerStats stats={blueTeam.jungle} duration={props.duration}/>
                    <PlayerStats stats={blueTeam.mid} duration={props.duration}/>
                    <PlayerStats stats={blueTeam.adc} duration={props.duration}/>
                    <PlayerStats stats={blueTeam.support} duration={props.duration}/>
                </div>
                <div className='player-stat-container' style={{backgroundColor: data.teams[1].win === 'Fail' ? '#EEC5C6' : '#DDF0F7'}}>
                    <div className='flex-display team-stats' style={{backgroundColor: data.teams[1].win === 'Fail' ? '#FF4E50' : '#08A6FF'}}>
                        <p>Red Team ({data.teams[1].win === 'Fail' ? 'Defeat': 'Victory'})</p>
                        <p>Dragons: {data.teams[1].dragonKills}</p>
                        <p>Barons: {data.teams[1].baronKills}</p>
                        <p>Towers: {data.teams[1].towerKills}</p>
                    </div>
                    <PlayerStats stats={redTeam.top} duration={props.duration}/>
                    <PlayerStats stats={redTeam.jungle} duration={props.duration}/>
                    <PlayerStats stats={redTeam.mid} duration={props.duration}/>
                    <PlayerStats stats={redTeam.adc} duration={props.duration}/>
                    <PlayerStats stats={redTeam.support} duration={props.duration}/>
                </div>
            </div> : ''}
        </React.Fragment>
    )
}

export default MatchDisplay