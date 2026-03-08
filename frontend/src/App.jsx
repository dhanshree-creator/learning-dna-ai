import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {

const [chats,setChats] = useState([]);
const [currentChat,setCurrentChat] = useState(null);
const [input,setInput] = useState("");
const [loading,setLoading] = useState(false);
const [sidebarOpen,setSidebarOpen] = useState(true);

const bottomRef = useRef(null);


/* LOAD CHATS */
useEffect(()=>{
const saved = localStorage.getItem("allChats");
if(saved){
setChats(JSON.parse(saved));
}
},[]);


/* SAVE CHATS */
useEffect(()=>{
localStorage.setItem("allChats",JSON.stringify(chats));
},[chats]);


/* AUTO SCROLL */
useEffect(()=>{
bottomRef.current?.scrollIntoView({behavior:"smooth"});
},[chats]);


/* CREATE NEW CHAT */

const newChat = ()=>{

const chat = {
id:Date.now(),
title:"New Chat",
messages:[]
};

setChats(prev=>[chat,...prev]);
setCurrentChat(chat.id);

};


/* SELECT CHAT */

const selectChat = (id)=>{
setCurrentChat(id);
};


/* GET CURRENT CHAT */

const chat = chats.find(c=>c.id === currentChat);


/* SEND MESSAGE */

const sendMessage = async ()=>{

if(!input.trim()) return;

const userMsg = {
role:"user",
content:input
};

const updatedChats = chats.map(c=>{

if(c.id === currentChat){

return {
...c,
messages:[...c.messages,userMsg]
};

}

return c;

});

setChats(updatedChats);
setInput("");
setLoading(true);


try{

const res = await fetch(
"https://ai-bharat-5q4q.onrender.com/explain",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
code:input,
level:"beginner",
context:"simple"
})
}
);

const data = await res.json();

const aiMsg = {
role:"ai",
content:data.explanation || "Error"
};

setChats(prev =>
prev.map(c =>

c.id === currentChat
? {...c, messages:[...c.messages,aiMsg]}
: c

));

}catch{

const errMsg = {
role:"ai",
content:"Server error"
};

setChats(prev =>
prev.map(c =>

c.id === currentChat
? {...c, messages:[...c.messages,errMsg]}
: c

));

}

setLoading(false);

};


/* REGENERATE RESPONSE */

const regenerate = ()=>{

if(!chat || chat.messages.length === 0) return;

const lastUser = [...chat.messages].reverse().find(m=>m.role==="user");

if(lastUser){
setInput(lastUser.content);
sendMessage();
}

};


/* EXPORT CHAT */

const exportChat = ()=>{

if(!chat) return;

const text = chat.messages
.map(m => `${m.role.toUpperCase()}:\n${m.content}\n`)
.join("\n");

const blob = new Blob([text],{type:"text/plain"});
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "chat.txt";
a.click();

};


return (

<div className="app">

{/* SIDEBAR */}

<div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

<button onClick={newChat}>
+ New Chat
</button>

<div className="chat-history">

{chats.map(c => (

<div
key={c.id}
className="chat-item"
onClick={()=>selectChat(c.id)}
>

{c.title}

</div>

))}

</div>

</div>


{/* MOBILE MENU BUTTON */}

<button
className="menu-btn"
onClick={()=>setSidebarOpen(!sidebarOpen)}
>
☰
</button>


{/* CHAT AREA */}

<div className="main">

<div className="messages">

{chat?.messages.map((m,i)=>(

<div key={i} className={`msg ${m.role}`}>
{m.content}
</div>

))}

{loading && <div className="msg ai">Thinking...</div>}

<div ref={bottomRef}></div>

</div>


{/* ACTION BUTTONS */}

<div className="actions">

<button onClick={regenerate}>
Regenerate
</button>

<button onClick={exportChat}>
Export Chat
</button>

</div>


{/* INPUT */}

<div className="input-bar">

<textarea
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Paste your code..."
/>

<button onClick={sendMessage}>
Send
</button>

</div>

</div>

</div>

);

}

export default App;