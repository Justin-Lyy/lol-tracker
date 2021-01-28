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

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function getPatch(gameVersion) {
    const validPatches = ["11.2.1","11.1.1","10.25.1","10.24.1","10.23.1","10.22.1","10.21.1","10.20.1","10.19.1","10.18.1","10.16.1","10.15.1","10.14.1","10.13.1","10.12.1","10.11.1","10.10.3216176","10.10.3208608","10.10.5","10.10.4","10.10.1","10.9.1","10.8.1","10.7.1","10.6.1","10.5.1","10.4.1","10.3.1","10.2.1","10.1.1","9.24.2","9.24.1","9.23.1","9.22.1","9.21.1","9.20.1","9.19.1","9.18.1","9.17.1","9.16.1","9.15.1","9.14.1","9.13.1","9.12.1","9.11.1","9.10.1","9.9.1","9.8.1","9.7.2","9.7.1","9.6.1","9.5.1","9.4.1","9.3.1","9.2.1","9.1.1","8.24.1","8.23.1","8.22.1","8.21.1","8.20.1","8.19.1","8.18.2","8.18.1","8.17.1","8.16.1","8.15.1","8.14.1","8.13.1","8.12.1","8.11.1","8.10.1","8.9.1","8.8.2","8.8.1","8.7.1","8.6.1","8.5.2","8.5.1","8.4.1","8.3.1","8.2.1","8.1.1","7.24.2","7.24.1","7.23.1","7.22.1","7.21.1","7.20.3","7.20.2","7.20.1","7.19.1","7.18.1","7.17.2","7.17.1","7.16.1","7.15.1","7.14.1","7.13.1","7.12.1","7.11.1","7.10.1","7.9.2","7.9.1","7.8.1","7.7.1","7.6.1","7.5.2","7.5.1","7.4.3","7.4.2","7.4.1","7.3.3","7.3.2","7.3.1","7.2.1","7.1.1","6.24.1","6.23.1","6.22.1","6.21.1","6.20.1","6.19.1","6.18.1","6.17.1","6.16.2","6.16.1","6.15.1","6.14.2","6.14.1","6.13.1","6.12.1","6.11.1","6.10.1","6.9.1","6.8.1","6.7.1","6.6.1","6.5.1","6.4.2","6.4.1","6.3.1","6.2.1","6.1.1","5.24.2","5.24.1","5.23.1","5.22.3","5.22.2","5.22.1","5.21.1","5.20.1","5.19.1","5.18.1","5.17.1","5.16.1","5.15.1","5.14.1","5.13.1","5.12.1","5.11.1","5.10.1","5.9.1","5.8.1","5.7.2","5.7.1","5.6.2","5.6.1","5.5.3","5.5.2","5.5.1","5.4.1","5.3.1","5.2.2","5.2.1","5.1.2","5.1.1","4.21.5","4.21.4","4.21.3","4.21.1","4.20.2","4.20.1","4.19.3","4.19.2","4.18.1","4.17.1","4.16.1","4.15.1","4.14.2","4.13.1","4.12.2","4.12.1","4.11.3","4.10.7","4.10.2","4.9.1","4.8.3","4.8.2","4.8.1","4.7.16","4.7.9","4.7.8","4.6.3","4.5.4","4.4.3","4.4.2","4.3.18","4.3.12","4.3.10","4.3.4","4.3.2","4.2.6","4.2.5","4.2.1","4.1.43","4.1.41","4.1.13","4.1.9","4.1.2","3.15.5","3.15.4","3.15.2","3.14.41","3.14.23","3.14.22","3.14.20","3.14.19","3.14.16","3.14.13","3.14.12","3.13.24","3.13.8","3.13.6","3.13.1","3.12.37","3.12.36","3.12.34","3.12.33","3.12.26","3.12.24","3.12.2","3.11.4","3.11.2","3.10.6","3.10.3","3.10.2","3.9.7","3.9.5","3.9.4","3.8.5","3.8.3","3.8.1","3.7.9","3.7.2","3.7.1","3.6.15","3.6.14","0.154.3","0.154.2","0.153.2","0.152.115","0.152.108","0.152.107","0.152.55","0.151.101","0.151.2","lolpatch_7.20","lolpatch_7.19","lolpatch_7.18","lolpatch_7.17","lolpatch_7.16","lolpatch_7.15","lolpatch_7.14","lolpatch_7.13","lolpatch_7.12","lolpatch_7.11","lolpatch_7.10","lolpatch_7.9","lolpatch_7.8","lolpatch_7.7","lolpatch_7.6","lolpatch_7.5","lolpatch_7.4","lolpatch_7.3","lolpatch_7.2","lolpatch_7.1","lolpatch_6.24","lolpatch_6.23","lolpatch_6.22","lolpatch_6.21","lolpatch_6.20","lolpatch_6.19","lolpatch_6.18","lolpatch_6.17","lolpatch_6.16","lolpatch_6.15","lolpatch_6.14","lolpatch_6.13","lolpatch_6.12","lolpatch_6.11","lolpatch_6.10","lolpatch_6.9","lolpatch_6.8","lolpatch_6.7","lolpatch_6.6","lolpatch_6.5","lolpatch_6.4","lolpatch_6.3","lolpatch_6.2","lolpatch_6.1","lolpatch_5.24","lolpatch_5.23","lolpatch_5.22","lolpatch_5.21","lolpatch_5.20","lolpatch_5.19","lolpatch_5.18","lolpatch_5.17","lolpatch_5.16","lolpatch_5.15","lolpatch_5.14","lolpatch_5.13","lolpatch_5.12","lolpatch_5.11","lolpatch_5.10","lolpatch_5.9","lolpatch_5.8","lolpatch_5.7","lolpatch_5.6","lolpatch_5.5","lolpatch_5.4","lolpatch_5.3","lolpatch_5.2","lolpatch_5.1","lolpatch_4.21","lolpatch_4.20","lolpatch_4.19","lolpatch_4.18","lolpatch_4.17","lolpatch_4.16","lolpatch_4.15","lolpatch_4.14","lolpatch_4.13","lolpatch_4.12","lolpatch_4.11","lolpatch_4.10","lolpatch_4.9","lolpatch_4.8","lolpatch_4.7","lolpatch_4.6","lolpatch_4.5","lolpatch_4.4","lolpatch_4.3","lolpatch_4.2","lolpatch_4.1","lolpatch_3.15","lolpatch_3.14","lolpatch_3.13","lolpatch_3.12","lolpatch_3.11","lolpatch_3.10","lolpatch_3.9","lolpatch_3.8","lolpatch_3.7"]

    const versionNum = gameVersion.split(".")

    const search = versionNum.slice(0,2).join(".")

    let patch = ""

    for (const validPatch of validPatches) {
        let patchNum = validPatch.split(".").slice(0,2).join(".")

        if(patchNum === search) {
            return validPatch
        }
    }

    return validPatches[0];
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
    const [patch, updatePatch] = useState()

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
        updatePatch(getPatch(props.data.gameVersion));
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
                    <p>{Math.floor(props.duration / 60)}:{pad((props.duration - (Math.floor(props.duration / 60) * 60)))}</p>
                    <p>{playerStats.stats.win ? 'Victory' : 'Defeat'}</p>
                </div>
                <div className='champion flex-display vertical-center'>
                    <div className='champ-icon'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champions[props.champ]}.png`}></img>
                    </div>
                    <p>{champions[props.champ]}</p>
                </div>
                <div className='spell-container flex-display'>
                    <div className='spell'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spells[playerStats.spell1Id]}.png`}></img>
                    </div>
                    <div className='spell'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spells[playerStats.spell2Id]}.png`}></img>
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
                <Inventory inventory={playerStats.stats} ext={''} patch={patch}/>
                <div className='flex-display team-rosters'>
                    <Team team={blueTeam} patch={patch}/>
                    <Team team={redTeam} patch={patch}/>
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
                    <PlayerStats stats={blueTeam.top} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={blueTeam.jungle} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={blueTeam.mid} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={blueTeam.adc} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={blueTeam.support} duration={props.duration} patch={patch}/>
                </div>
                <div className='player-stat-container' style={{backgroundColor: data.teams[1].win === 'Fail' ? '#EEC5C6' : '#DDF0F7'}}>
                    <div className='flex-display team-stats' style={{backgroundColor: data.teams[1].win === 'Fail' ? '#FF4E50' : '#08A6FF'}}>
                        <p>Red Team ({data.teams[1].win === 'Fail' ? 'Defeat': 'Victory'})</p>
                        <p>Dragons: {data.teams[1].dragonKills}</p>
                        <p>Barons: {data.teams[1].baronKills}</p>
                        <p>Towers: {data.teams[1].towerKills}</p>
                    </div>
                    <PlayerStats stats={redTeam.top} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={redTeam.jungle} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={redTeam.mid} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={redTeam.adc} duration={props.duration} patch={patch}/>
                    <PlayerStats stats={redTeam.support} duration={props.duration} patch={patch}/>
                </div>
            </div> : ''}
        </React.Fragment>
    )
}

export default MatchDisplay