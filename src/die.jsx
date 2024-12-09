export default function Die(props)
{
    let style={
        backgroundColor:props.state?"#59e391":"white"
       }
    return(
        <button style={style} onClick={()=>{props.onclick(props.id)}}>{props.value}</button>
    )
}