import { useEffect, useState } from 'react'

import './App.css'

function App() {
 const [displaytable,settable]=useState(false)
 const [urldata,seturldata]=useState({
   originalurl:"",
   shorturl:"",
 })
 const [err,seterr]=useState({
   display:false,
   data:""
 })



 const getdata=async()=>{
let res=await fetch("http://localhost:8080/urls");
let data=await res.json();
console.log("data",data)
if(data.length!==0){
  let check=data.filter(ele=>(
    ele.originalurl===urldata.originalurl && ele.shorturl===urldata.shorturl
  ))
  console.log(check)
  if(check.length!=0){
    seterr({
      ...err,
      display: true,
      data:"Please change the ShortedURL",
    })
    
  }else{
    postdata();
  }
}else{
  postdata();
}

}

const postdata=async()=>{
  seterr({
    ...err,
    display: false,
    data:"",
  })
  settable(true)
  let post=await fetch("http://localhost:8080/urls",{
    method:"POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(urldata),
  });
}

const handleurl=(e)=>{
  e.preventDefault();
if(urldata.originalurl==="" && urldata.shorturl===""){
seterr({
  ...err,
  display: true,
  data:"Please Fill All The Details",
})
}
else{
  seterr({
    ...err,
    display: false,
  data:"",
  }
    )
    
    
    getdata();
}
 
}

const urlinput=(e)=>{
  const { name, value } = e.target;

  seturldata({
    ...urldata,
    [name]: value,
  });
}

  return (
    <div className="App">
     <div className="form">
       <form action="" onSubmit={handleurl}>
         <h1>Enter a long URL to make a TinyURL</h1>
         <input type="text"  placeholder='URL' name="originalurl" onChange={urlinput}/>
         <h1>Customize your link</h1>
         <input type="text"  placeholder='URL' name='shorturl' onChange={urlinput}/>
         <br />
         <br />
         <input type="submit" value="Make Tiny URL"  id="submit" o/>
       </form>
     </div>
    {displaytable? <div className="table">
       <table>
         <thead>
           <tr>
             <th>Original URL</th>
             <th>Tiny Url</th>
            
           </tr>
         </thead>
         <tbody>
           <tr>
             <td><a target="_blank" href={"https://www."+urldata.originalurl}>{urldata.originalurl}</a></td>
             <td><a target="_blank" href={"https://www."+urldata.originalurl}>{urldata.shorturl}</a></td>
             
           </tr>
         </tbody>
       </table>
     </div>:
     err.display?<div><h2>{err.data}</h2></div>:null
     
     }
    </div>
  )
}

export default App
