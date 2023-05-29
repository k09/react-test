import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './counterSlice';
import { ThemeContext } from '../../app/ThemeContext';
import { useContext } from 'react';

const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.value);
    const {theme} = useContext(ThemeContext);
    return (
        <div>
            <h3 className={theme}>Redux Toolkit (useDispatch() & useSelector())</h3>
            <button onClick={() => dispatch(decrement())}>-</button>&nbsp;
            <button onClick={() => dispatch(increment())}>+</button>&nbsp;
            <span>{count}</span>
            <hr/>
        </div>
    );
}
export default Counter;
  