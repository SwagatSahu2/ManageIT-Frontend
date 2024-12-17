import { useEffect } from "react"
import React from 'react'
import * as d3 from 'd3'


export default function CommonSVGElements() {
  
  useEffect(()=>{
    const selectedElement = d3.select('.my-class')
    console.log({selectedElement})
    selectedElement.style("background-color","blue")
    const selectedElementP = d3.select('p')
    selectedElementP.style("background-color","red")
    console.log({selectedElementP})
    })
  const items = ['Apple', 'Banana', 'Orange', 'Grapes'];
  let Student = [ "Aman", "Arun", "Bhairav" ];
  let [stud1, stud2, stud3 ] = Student;
 
  console.log(stud1);
  console.log(stud2);
  console.log(stud3);
  return (
    <div>
      <h3>Common SVG Elements</h3>
      <svg width={800} height={800} style={{border:"1px solid red"}}>
        
        {/* <rect width={200} height={200} x = {0} y={0} fill='blue'/>
        <circle r={20} fill='red' cx={100} cy={100}/>
        <text x={400} y={400} fill="green" fontSize={20}>Hellow World!</text> */}
        
        <path 
          d="M50,15 L25,75 75,75 50,15 M50,85 L25,25 75,25 50,85" 
          stroke="blue" 
          strokeWidth="3" 
          fill="none" 
          transform="translate(80, 0)" 
        /> 
  
         {/* <path d = "M25,25 C30,90 40,95 75,75 M25,25 C10,80 40,95 75,75" stroke='red' stroke-width='3 fill='none /> */}
         {/* <path d="M10,20 A 30,30 0 0,0 40,70"  /> */}
         {/* <path d="M10,20 A 30,30 0 1 0 40,70" /> */}
    <path d="M10,20 A 30,30 0 0 0 40,70 A 30,30 0 1 1 10,20" transform="translate(50, 0)" style={{ stroke: 'black', fill: 'none', strokeWidth: '3' }} />      </svg>
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'skyblue', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="100" fill="url(#gradient1)" />

      <line x1="20" y1="20" x2="180" y2="180" stroke="white" strokeWidth="5" />

      <text x="50%" y="50%" fontSize="20" textAnchor="middle" fill="purple" dy=".3em" >
        Employee Manager
      </text>
    </svg>
    <div className='my-class'>a</div>
    <p className='my-class'>a</p>
    <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> 
        ))}
    </ul>
    </div>
  )
}
