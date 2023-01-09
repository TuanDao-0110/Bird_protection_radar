import React, { useEffect, useRef } from 'react'

export default function Anoument({message}) {
 const ref = useRef(null);

 useEffect(() => {
   // Slide down the announcement
   ref.current.style.top = "0";

   // Hide the announcement after 3 seconds
   setTimeout(() => {
     ref.current.style.top = "-50px";
   }, 3000);
 }, []); // Only run the effect once

 return (
   <div ref={ref} className="announcement">
     {message}
   </div>
 );
}
