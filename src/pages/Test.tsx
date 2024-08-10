import React, { useRef,} from "react";
import "../styles/test.css"

import Test2 from "./Test2";

export default function Test() {

  console.log(Test2)

    function setStyle(e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {

      


      console.log(displayRef.current)
      
      if (displayRef.current) {
        displayRef.current.style.setProperty(`--${e.currentTarget.id}`, e.currentTarget.value);
      }
    }

const displayRef = useRef<any>(null)


    return(
        <div className="container">
            
<form>
  <div>
    <label htmlFor="blend-top">Top Layer</label>
    <select onChange={(e)=>setStyle(e)} id="blend-top">
      <option>normal</option>
      <option>multiply</option>
      <option>screen</option>
      <option>overlay</option>
      <option>darken</option>
      <option>lighten</option>
      <option>color-dodge</option>
      <option>color-burn</option>
      <option>hard-light</option>
      <option>soft-light</option>
      <option>difference</option>
      <option>exclusion</option>
      <option>hue</option>
      <option>saturation</option>
      <option>color</option>
      <option>luminosity</option>
    </select>
  </div>
  <div>
    <label htmlFor="blend-bottom">Middle Layer</label>
    <select onChange={(e)=>setStyle(e)} id="blend-bottom">
      <option>normal</option>
      <option>multiply</option>
      <option>screen</option>
      <option>overlay</option>
      <option>darken</option>
      <option>lighten</option>
      <option>color-dodge</option>
      <option>color-burn</option>
      <option>hard-light</option>
      <option>soft-light</option>
      <option>difference</option>
      <option>exclusion</option>
      <option>hue</option>
      <option>saturation</option>
      <option>color</option>
      <option>luminosity</option>
    </select>
  </div>
  <div>
    <input type="color" />
    <label htmlFor="color-top">Top Color</label>
    <select onChange={(e)=>setStyle(e)} id="color-top">
      <option>transparent</option>
      <option>grey</option>
      <option>black</option>
      <option>green</option>
      <option>red</option>
      <option>hotpink</option>
      <option>blue</option>
      <option>yellow</option>
      <option>orange</option>
      <option>purple</option>
    </select>
  </div>
  <div>
    <label htmlFor="color">Middle Color</label>
    <select onChange={(e)=>setStyle(e)} id="color">
      <option>transparent</option>
      <option>grey</option>
      <option>green</option>
      <option>red</option>
      <option>hotpink</option>
      <option>blue</option>
      <option>yellow</option>
      <option>orange</option>
      <option>purple</option>
    </select>
  </div>
</form>

<div ref={displayRef} className="display" ></div>
        </div>
    )
}