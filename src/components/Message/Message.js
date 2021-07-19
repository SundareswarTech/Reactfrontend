import './Message.css'

function Message(props){
    return(
        <div className={props.message.type==="success"?"success":"failure"}>{props.message.message}</div>
    )
}

export default Message;