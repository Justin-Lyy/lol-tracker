import React from 'react';

function Inventory(props) {
    return (
        <div className={`inventory-container${props.ext} flex-display`}>
            <div className={`item${props.ext}`}>
                {props.inventory.item0? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item0}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>
            <div className={`item${props.ext}`}>
                {props.inventory.item1? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item1}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>
            <div className={`item${props.ext}`}>
                {props.inventory.item2? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item2}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>
            {!props.ext ? <div className={`item${props.ext}`}>
                {props.inventory.item6? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item6}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>:''}
            <div className={`item${props.ext}`}>
                {props.inventory.item3? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item3}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>
            <div className={`item${props.ext}`}>
                {props.inventory.item4? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item4}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>
            <div className={`item${props.ext}`}>
                {props.inventory.item5? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item5}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>
            {props.ext ? <div className={`item${props.ext}`}>
                {props.inventory.item6? <img src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${props.inventory.item6}.png`}></img>:
                <div className={`item-placeholder${props.ext}`}></div>}
            </div>:''}
        </div>
    )
}

export default Inventory