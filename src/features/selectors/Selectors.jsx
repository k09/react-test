import { useState } from "react"
import { selectA, selectB, selectC, selectABC } from "./selectorsSlice";


const Selectors = () => {
    
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);

    const abcSelected = selectABC();
    const aSelected = selectA();
    const bSelected = selectB();
    const cSelected = selectC();

  return (
    <>
        <h3>Selectors (memoized)</h3>
        <p>a1: {aSelected}/{a} <input type='number' value={a} onChange={(e) => setA(e.target.value)} /></p>
        <p>b1: {bSelected}/{b} <input type='number' value={b} onChange={(e) => setB(e.target.value)} /></p>
        <p>c1: {cSelected}/{c} <input type='number' value={c} onChange={(e) => setC(e.target.value)} /></p>
        <p>abc: {abcSelected}</p>
        <p><strong>Finish this: <a href='https://redux.js.org/usage/deriving-data-selectors#createselector-overview'>https://redux.js.org/usage/deriving-data-selectors#createselector-overview</a></strong></p>
        <hr/>
    </>
  )
}

export default Selectors
