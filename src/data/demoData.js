export const demoChats = [
  { id:"alex", name:"Alex", initials:"AX", tone:"mint", message:"Are you coming today?", time:"10:42", unread:2, online:true, muted:false },
  { id:"sarah", name:"Sarah", initials:"SA", tone:"violet", message:"That looks amazing!", time:"09:31", unread:0, online:true, muted:false },
  { id:"mike", name:"Mike", initials:"MK", tone:"blue", message:"Let's talk later.", time:"Yesterday", unread:0, online:false, muted:true },
  { id:"john", name:"John", initials:"JO", tone:"orange", message:"Thanks!", time:"Yesterday", unread:1, online:false, muted:false },
  { id:"mia", name:"Mia", initials:"MI", tone:"pink", message:"The photos are ready.", time:"Mon", unread:0, online:false, muted:false }
];

export const demoMessages = {
  alex: [
    {id:1, from:"them", text:"Hey! Are you free today?", time:"10:36", read:true},
    {id:2, from:"me", text:"I think so. What time?", time:"10:38", read:true},
    {id:3, from:"them", text:"Around noon sounds good.", time:"10:40", read:true},
    {id:4, from:"them", text:"Are you coming today?", time:"10:42", read:false}
  ],
  sarah: [
    {id:1, from:"me", text:"I finally finished the new layout.", time:"09:25", read:true},
    {id:2, from:"them", text:"That looks amazing!", time:"09:31", read:true}
  ],
  mike: [
    {id:1, from:"them", text:"I have a few things to finish first.", time:"Yesterday", read:true},
    {id:2, from:"me", text:"No worries.", time:"Yesterday", read:true},
    {id:3, from:"them", text:"Let's talk later.", time:"Yesterday", read:true}
  ],
  john: [
    {id:1, from:"me", text:"Sent it over.", time:"Yesterday", read:true},
    {id:2, from:"them", text:"Thanks!", time:"Yesterday", read:true}
  ],
  mia: [
    {id:1, from:"them", text:"The photos are ready.", time:"Mon", read:true}
  ]
};