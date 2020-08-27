// data is the data object from ../Components/MatchDisplay/js

function unsorted(sortedTeam, team) {
    let lanes = ['adc', 'support', 'jungle', 'mid', 'top']

    let sortedLanes = lanes.filter(lane => {
        return sortedTeam[lane]
    })

    let sortedPlayers = sortedLanes.map(lane => {
        return sortedTeam[lane]
    })

    //get the unsorted lanes
    let unsortedPlayers = team.filter(player => {
        let match = false
        for (let i=0; i < sortedPlayers.length; i++) {
            if (player.name === sortedPlayers[i].name) {
                match = true
                break;
            }
        }
        return !match
    })

    return unsortedPlayers
}

function advancedSort(team) {

    // reorder the teams based on role
    let teamRoles = {bottom: [], none: [], mid: [], top: [], jungle: []}
    team.forEach(player => {
        if (player.lane === 'TOP') {
            teamRoles['top'].push(player)
        } else if (player.lane === 'JUNGLE') {
            teamRoles['jungle'].push(player)
        } else if (player.lane === 'MIDDLE') {
            teamRoles['mid'].push(player)
        } else if (player.lane === 'BOTTOM' ){
            teamRoles.bottom.push(player)
        } else {
            teamRoles.none.push(player)
        }
    });
    
    let sortedTeam = {}

    let laneArray = Object.keys(teamRoles)    

    // sort solo lanes that only have one person designated as that lane
    laneArray.forEach(lane => {
        if (teamRoles[lane].length === 1 && lane !== 'bottom') {
            sortedTeam[lane] = teamRoles[lane][0]
        }
    })

    // sort bottom lane only if there are two people
    if (teamRoles.bottom.length === 2) {
        teamRoles.bottom.forEach(laner => {
            if (laner.role === 'DUO_CARRY') {
                sortedTeam['adc'] = laner
            } else if (laner.role === 'DUO_SUPPORT') {
                sortedTeam['support'] = laner
            }
        })
        // check of anything has been assigned
        // if not just assign the bottom laners based on id number
        if (!sortedTeam['adc'] && !sortedTeam['support']) {
            sortedTeam['adc'] = teamRoles.bottom[0]
            sortedTeam['support'] = teamRoles.bottom[1]
        }
    } 

    //get the unsorted lanes
    let unsortedPlayers = unsorted(sortedTeam, team)

    // check if jungle is empty, if yes assign jungle to any unsorted player with smite
    if (!sortedTeam['jungle']) {
        unsortedPlayers.forEach(player => {
            if (player.spell1 === 11 || player.spell2 === 11) {
                sortedTeam['jungle'] = player
            } 
        })
    }

    unsortedPlayers = unsorted(sortedTeam, team)

    // check if adc is empty, if yes assign adc to any unsorted player with heal
    if (!sortedTeam.adc) {
        unsortedPlayers.forEach(player => {
            if (player.spell1 === 7 || player.spell2 === 7) {
                sortedTeam['adc'] = player
            } 
        })
    }

    unsortedPlayers = unsorted(sortedTeam, team)

    // check if top is empty, if yes assign top to any unsorted player with tp
    if (!sortedTeam.top) {
        unsortedPlayers.forEach(player => {
            if (player.spell1 === 12 || player.spell2 === 12) {
                sortedTeam.top = player
            } 
        })
    }

    unsortedPlayers = unsorted(sortedTeam, team)

    // check if support is empty, if it is assign support to the unsorted player with the least cs
    if (!sortedTeam.support) {
        let csArray = []
        unsortedPlayers.forEach(player => {
            csArray.push(player.cs)
        })

        csArray = csArray.sort((a, b) => (a-b))
        console.log(csArray)
        unsortedPlayers.forEach(player => {
            let cs = player.cs
            if (cs === csArray[0]) {
                sortedTeam.support = player
            }
        })
    }

    unsortedPlayers = unsorted(sortedTeam, team)

    // assign any unsorted players to the remaining unsorted lanes
    let lanes = ['adc', 'support', 'jungle', 'mid', 'top']
    let unsortedLanes = lanes.filter(lane => !sortedTeam[lane])
    unsortedPlayers.forEach((player, index) => {
        let lane = unsortedLanes[index]
        sortedTeam[lane] = player
    })

    return sortedTeam
}

function sortTeams(data) {

    // create an array of player objects, each object will have an id, name, lane, and role
    let playerList = data.participants.map((participant, index) => {
        return {
            id: participant.participantId,
            name: data.participantIdentities[index].player.summonerName,
            champ: participant.championId,
            lane: participant.timeline.lane,
            role: participant.timeline.role,
            spell1: participant.spell1Id,
            spell2: participant.spell2Id,
            kills: participant.stats.kills,
            deaths: participant.stats.deaths,
            assists: participant.stats.assists, 
            level: participant.stats.champLevel,
            cs: (+participant.stats.totalMinionsKilled + +participant.stats.neutralMinionsKilled),
            visionScore: participant.stats.visionScore,
            item0: participant.stats.item0,
            item1: participant.stats.item1,
            item2: participant.stats.item2,
            item3: participant.stats.item3,
            item4: participant.stats.item4,
            item5: participant.stats.item5,
            item6: participant.stats.item6,
            dmg: participant.stats.totalDamageDealtToChampions

        }
    })

    // split the array in to red and blue sides
    let blueTeam = playerList.slice(0, 5)
    let redTeam = playerList.slice(5, 10)

    let red = advancedSort(redTeam)
    let blue = advancedSort(blueTeam)

    return {red, blue}
}

export default sortTeams