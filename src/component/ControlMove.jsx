export default function ControlMove({id, move, pointer, changeBoard}) {
    let value = pointer;
    return (
        <button className = "move" onClick = {(() => changeBoard(id))}>{value} move</button>
    )
}