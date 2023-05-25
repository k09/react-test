import { useState } from "react";
import { ThemeContext } from '../../app/ThemeContext';
import { useContext } from 'react';

const StateCounter = () => {
    const [count, setCount] = useState(0);
    const {theme} = useContext(ThemeContext);
    return (
        <>
            <h3 className={theme}>React (useState())</h3>
            <button onClick={() => setCount(count-1)}>-</button>&nbsp;
            <button onClick={() => setCount(count+1)}>+</button>&nbsp;
            <span>{count}</span>
            <hr/>
        </>
    )
}

export default StateCounter
