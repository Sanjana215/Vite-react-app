import Die from "./die.jsx"
import Button from "./button.jsx"
import React from "react"
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use';
import { nanoid } from 'nanoid'

export default function Main()
{
    let newgameref=React.useRef(null)
    
    function generateNumbers()
    {
        let randomNumbersButtons=[]
        for (let i = 0; i < 10; i++) {
            let randomNumber = Math.floor(Math.random() * 6) + 1;
            randomNumbersButtons.push(randomNumber);
        }
            return randomNumbersButtons
    }
   
    
    let [dieState,func]=React.useState(()=>{return generateNumbers().map((ele)=>{
        let createid=nanoid();
        
        return {key:createid,value:ele,state:false,id:createid,}})})
    
    

    function handleclick()
    {
        let newarray=generateNumbers()
        func((prev)=>{
            let i=0
           return  prev.map((ele)=>{
                 ele.value=ele.state?ele.value:newarray[i]
                 i++
                 return ele
            })
        })
    
    }
    function newgame()
    {
        let initialState=generateNumbers().map((ele)=>{
            let newid=nanoid()
            return {key:newid,value:ele,state:false,id:newid,}})
        func(initialState)
    }
    function buttonclick(id)
    {

         func((prev)=>{
            return prev.map((ele)=>{
                 return ele.id===id?{...ele,state:!ele.state}:ele
            })
        })
               
    }
   
    function checkwon()
    {
        let val=dieState[0].value
        for(let i of dieState)
        {
            if(i.state===true && i.value===val)
               continue
            else
                return false
        }
        return true
    }
    let gamewon=checkwon();

   let  DieElements=dieState.map((obj)=>{return <Die value={obj.value} onclick={buttonclick} state={obj.state} key={obj.id} id={obj.id}/>})
   const { width, height } = useWindowSize()
    
    return(
        <>
        <main>
            
           {gamewon && <Confetti  width={width} height={height}/>}
           
            <div className="border-box">
                 {gamewon && <h2 className="wontxt">Congragulations!! You Won.</h2>} 
                 <section>
                    <h1>Tenzies</h1>
                     <p>Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
                 </section>
                 <div>
                    {DieElements}
                 </div>
                 <Button  handleclick={handleclick} newgame={newgame} text={gamewon?"New Game":"Roll all"} />
           </div>
        </main>
           
        </>
    )
}