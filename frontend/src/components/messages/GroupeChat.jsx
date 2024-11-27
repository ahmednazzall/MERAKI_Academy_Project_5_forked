import React,{useEffect,useState} from 'react'

const GroupeChat = () => {
  const [room, setRoom] = useState("")

  useEffect(() => {
   
    socket?.on("join-room",(data)=>{
            console.log(data);
            
    })
    return () => {
       
    };
  }, []);

  const handleJoin=()=>{
    if(room!=""){
        socket.emit("join-room",room)
    }
  }
  return (
    <div>GroupeChat</div>
  )
}

export default GroupeChat