
export default function Button({id,value, changeState}) {
    return(
        <button onClick = {(e) => changeState(id)} className = "numbers">{value}</button>
    )
}