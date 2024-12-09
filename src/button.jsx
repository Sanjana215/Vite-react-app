export default function Button(props,ref)
{
    
    return(
        <button className="roll" 
        onClick={props.text==="Roll all"?props.handleclick:props.newgame}
       
        >{props.text}
        </button>
    )
}