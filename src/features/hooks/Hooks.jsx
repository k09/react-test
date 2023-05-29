import { useState, useReducer, useContext, useRef, useEffect } from "react"
import { ThemeContext } from '../../app/ThemeContext';

const Hooks = () => {
    //useState
    const [cnt, setCnt] = useState(0);
    const [txt, setTxt] = useState('');
    const [chk, setChk] = useState(false);
    const [name, setName] = useState('Kristján');
    const [age, setAge] = useState(55);
    const [frm, setFrm] = useState({
        firstName: 'Arthur',
        lastName: 'Dent',
        email: 'arthur@dent.org'
    });
    //useReducer
    const [stateUseReducerCounter, dispatchUseReducerCounter] = useReducer(reducerUseReducerCounter, { useReducerCounter: 0 });
    function reducerUseReducerCounter(stateUseReducerCounter, actionUseReducerCounter) {
        if (actionUseReducerCounter.type === 'inc') {
          return {
            useReducerCounter: stateUseReducerCounter.useReducerCounter + 1
          };
        } else if (actionUseReducerCounter.type === 'dec') {
            return {
              useReducerCounter: stateUseReducerCounter.useReducerCounter - 1
            };
          }
        throw Error('Unknown action.');
      }
    //useContext
    const {theme, setTheme} = useContext(ThemeContext);
    //useRef
    const refOne = useRef(null);
    const refTwo = useRef(null);
    let txtOne = 'Number one.......';
    let txtTwo = 'Number two.......';
    let isFirst = true;
    const handleUseRefExample = () => {
        if (isFirst === true) {
            refOne.current.value = txtOne;
            refOne.current.focus();
            refOne.current.select();
            refTwo.current.value = '';
        } else {
            refTwo.current.value = txtTwo;
            refTwo.current.focus();
            refTwo.current.select();
            refOne.current.value = '';
        }
        isFirst = !isFirst;
    }
    //useEffect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 9});
    useEffect(() => {
        const handleMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            window.document.title = `Mouse position: (${e.clientX}, ${e.clientY})`;
        }
        window.addEventListener('pointermove', handleMove);
        return () => {
            window.removeEventListener('pointermove', handleMove);
        };
    }, []);
    const [changeBackgroundColorInterval, setChangeBackgroundColorInterval] = useState(1000);
    const [backgroundColorUseEffect, setBackgroundColorUseEffect] = useState({ r: 64, g: 32, b: 16})
    const clearChangeBackgroundColorInterval = useEffect(() => {
        const min = 0; 
        const max = 256;
        const intervalId = setInterval(() => {
            const red = Math.floor(Math.random() * (max-min)+min);
            const green = Math.floor(Math.random() * (max-min)+min);
            const blue = Math.floor(Math.random() * (max-min)+min);
            setBackgroundColorUseEffect({r: red, g: green, b: blue});
            window.document.title = `Background color (changes every ${changeBackgroundColorInterval} millisecond(s)): (${red}, ${green}, ${blue})`;
        }, changeBackgroundColorInterval);
        return () => clearInterval(intervalId);
      }, [changeBackgroundColorInterval]); 
    return (
        <>
            <h3 className={theme}>React Hooks</h3>
            <div>Hooks let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own.</div>
            <h4 className={theme}>State Hooks</h4> 
            <p>State lets a component “remember” information like user input. For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.</p>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useState'>useState()</a></h5>
            <p>Declares a state variable that you can update directly.</p>
            <div>
                <button onClick={() => setCnt(cnt => cnt-1)}>-</button> 
                <button onClick={() => setCnt(cnt => cnt+1)}>+</button> 
                &nbsp;
                <span>{cnt}</span>
            </div >
            <br />
            <div>
                <input type='text' value={txt} onChange={(e) => setTxt(e.target.value)}/>&nbsp;
                <button type='text' onClick={() => setTxt(txt => '')}>-</button>
                <br />
                <span>{txt}</span>
            </div>
            <br />
            <div>
                <input type='checkbox' onChange={() => setChk(chk => !chk)} />
                <span>{chk ? 'Uncheck it!' : 'Check it!'}</span>
            </div>
            <br />
            <div>
                <input type='text' value={name} onChange={(e) => setName(name => e.target.value)} />
                <input type='number' value={age} onChange={(e) => setAge(age => Number(e.target.value))}/>
                <br/>
                <span>{`Name: ${name}, age: ${age}`}</span>
            </div>
            <br/>
            <br/>
            <div>
                <form>
                    <label htmlFor='firstName'>First name:</label>
                    <input type='text' id='firstName' value={frm.firstName} onChange={(e) => setFrm({...frm, firstName: e.target.value})}/>
                    <br/>
                    <label htmlFor='lastName' >Last name:</label>
                    <input type='text' id='lastName' value={frm.lastName} onChange={(e) => setFrm({...frm, lastName: e.target.value})}/>
                    <br/>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' value={frm.email} onChange={(e) => setFrm({...frm, email: e.target.value})}/>
                    <ul>
                        <li>{`First Name: ${frm.firstName}`}</li>
                        <li>{`Last Name: ${frm.lastName}`}</li>
                        <li>{`Email: ${frm.email}`}</li>
                    </ul>
                </form>
                <button onClick={() => setFrm({...frm, firstName: '', lastName: '', email: '' })}>-</button>
            </div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useReducer'>useReducer()</a></h5>
            <p>Declares a state variable with the update logic inside a reducer function.</p>
            <hr/>
            <div>
                <button onClick={() => { dispatchUseReducerCounter({ type: 'dec' })}}>-</button>&nbsp;
                <button onClick={() => { dispatchUseReducerCounter({ type: 'inc' })}}>+</button>&nbsp;
                <span>{stateUseReducerCounter.useReducerCounter}</span>
            </div>
            <hr/>
            <h4 className={theme}>Context Hooks</h4>
            <div>Context lets a component receive information from distant parents without passing it as props. For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useContext'>useContext()</a></h5>
            <p>Context lets a component receive information from distant parents without passing it as props. For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.</p>
            <hr/>
            <div>
                <div>Theme is now: {theme}</div>
                Dark:&nbsp;<input type='radio' name='theme' value='dark' checked={theme === 'dark'} onChange={(e) => setTheme(e.target.value)} />&nbsp;
                Light:&nbsp;<input type='radio' name='theme' value='light' checked={theme === 'light'} onChange={(e) => setTheme(e.target.value)} />
            </div>
            <hr/>
            <h4 className={theme}>Ref Hooks</h4>
            <p>Refs let a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.</p>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useRef'>useRef()</a></h5>
            <p>useRef declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.</p>
            <hr/>
            <div>
                <input type='text' ref={refOne} value={txtOne} onChange={(e) => console.log(e.target.value)} />
                <input type='text' ref={refTwo} value={txtTwo} onChange={(e) => console.log(e.target.value)} />
                <button onClick={handleUseRefExample}>useRef example.....</button>
            </div>
            <hr/>
            <div>
                <h5><a href='https://react.dev/reference/react/useImperativeHandle'>useImperativeHandle()</a></h5>
                <p>useImperativeHandle lets you customize the ref exposed by your component. This is rarely used.</p>
                <hr/>
                <div>No example........</div>
            </div>
            <hr/>
            <h4 className={theme}>Effect Hooks</h4>
            <p>Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.</p>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useEffect'>useEffect()</a></h5>
            <p>useEffect connects a component to an external system.</p>
            <div style={{
                position: 'absolute', backgroundColor: 'green', borderRadius: '50%', opacity: 0.6, transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                pointerEvents: 'none', left: -20, top: -20, width: 40, height: 40,
            }} />
            <div>
                <div>Interval: <input type='number' value={changeBackgroundColorInterval} onChange={(e) => setChangeBackgroundColorInterval(e.target.value)}/> millisecond(s)</div>
                <div>Current background color: ({backgroundColorUseEffect.r}, {backgroundColorUseEffect.g}, {backgroundColorUseEffect.b})</div>
                <div>Current interval: {changeBackgroundColorInterval}</div>
                <div><pre>{JSON.stringify(backgroundColorUseEffect, null, 5)}</pre></div>
                <button onClick={clearChangeBackgroundColorInterval}>stop!</button>
                <div style={{minWidth: '512px', minHeight: '32px', backgroundColor: `rgb(${backgroundColorUseEffect.r},${backgroundColorUseEffect.g},${backgroundColorUseEffect.b})`}} />
            </div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useLayoutEffect'>useLayoutEffect()</a></h5>
            <p>useLayoutEffect can hurt performance. Prefer useEffect when possible.</p>
            <p>useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.</p>
            <hr/>
            <div>No example........</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useInsertionEffect'>useInsertionEffect()</a></h5>
            <p>useInsertionEffect is a version of useEffect that fires before any DOM mutations.</p>
            <p>useInsertionEffect is for CSS-in-JS library authors. Unless you are working on a CSS-in-JS library and need a place to inject the styles, you probably want useEffect or useLayoutEffect instead.</p>
            <hr/>
            <div>No example........</div>
            <hr/>
            <h4 className={theme}>Performance Hooks</h4>
            <div>A common way to optimize re-rendering performance is to skip unnecessary work. For example, you can tell React to reuse a cached calculation or to skip a re-render if the data has not changed since the previous render.</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useMemo'>useMemo()</a></h5>
            <div>useMemo is a React Hook that lets you cache the result of a calculation between re-renders.</div>
            <div>Caching return values like this is also known as memoization, which is why this Hook is called useMemo.</div>
            <hr/>
            <div>Find a simple example........</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useCallback'>useCallback()</a></h5>
            useCallback is a React Hook that lets you cache a function definition between re-renders.
            <hr/>
            <div>Find a simple example........</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useTransition'>useTransition()</a></h5>
            <div>useTransition is a React Hook that lets you update the state without blocking the UI.</div>
            <hr/>
            <div>Find a simple example........</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useDeferredValue'>useDefferedValue()</a></h5>
            <div>useDeferredValue is a React Hook that lets you defer updating a part of the UI.</div>
            <hr/>
            <div>Find a simple example........</div>
            <hr/>
            <h4 className={theme}>Other Hooks</h4>
            <div>These Hooks are mostly useful to library authors and aren’t commonly used in the application code.</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useDebugValue'>useDebugValue()</a></h5>
            <div>useDebugValue is a React Hook that lets you add a label to a custom Hook in React DevTools.</div>
            <hr/>
            <div>No example........</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useId'>useId()</a></h5>
            <div>useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.</div>
            <hr/>
            <div>No example........</div>
            <hr/>
            <h5><a href='https://react.dev/reference/react/useSyncExternalStore'>useSyncExternalStore()</a></h5>
            <div>useSyncExternalStore is a React Hook that lets you subscribe to an external store.</div>
            <hr/>
            <div>No example........</div>
            <hr/>
            <h3 className={theme}><a href='https://react-redux.js.org/api/hooks'>Redux Hooks</a></h3>
            <div>React Redux includes its own custom hook APIs, which allow your React components to subscribe to the Redux store and dispatch actions.</div>
            <h5>useSelector()</h5>
            <p>Description.......</p>
            <div>Example........</div >
            <hr/>
            <h5>useDispatch()</h5>
            <p>Description.......</p>
            <div>Example........</div >
            <hr/>
            <h5>useStore()</h5>
            <p>Description.......</p>
            <div>Example........</div >
            <hr/>
            <h5>useActions()</h5>
            <p>Description.......</p>
            <div>Example........</div >
            <hr/>
            <h5>useShallowEqualSelector()</h5>
            <p>Description.......</p>
            <div>Example........</div >
            <hr/>

            <h3 className={theme}>RTK Query</h3>
            <div>Web applications normally need to fetch data from a server in order to display it. They also usually need to make updates to that data, send those updates to the server, and keep the cached data on the client in sync with the data on the server. This is made more complicated by the need to implement other behaviors used in today's applications:</div>
            <ul>
                <li>Tracking loading state in order to show UI spinners</li>
                <li>Avoiding duplicate requests for the same data</li>
                <li>Optimistic updates to make the UI feel faster</li>
                <li>Managing cache lifetimes as the user interacts with the UI</li>
            </ul>
            <p><strong>Your application is expected to have only one createApi call in it. This one API slice should contain all endpoint definitions that talk to the same base URL. For example, endpoints /api/posts and /api/users are both fetching data from the same server, so they would go in the same API slice. If your app does fetch data from multiple servers, you can either specify full URLs in each endpoint, or if necessary create separate API slices for each server.</strong></p>
            <p><strong>Endpoints are normally defined directly inside the createApi call. If you're looking to split up your endpoints between multiple files, see the "Injecting Endpoints" section in Part 8 section of the docs!</strong></p>
            <p>By default, query endpoints will use a GET HTTP request, but you can override that by returning an object like url: '/posts', method: 'POST', body: newPost instead of just the URL string itself. You can also define several other options for the request this way, such as setting headers.</p>

            <h3>There are 5 query-related hooks:</h3>
            <dl>
                <dt>useQuery</dt>
                <dd>Composes useQuerySubscription and useQueryState and is the primary hook. Automatically triggers fetches of data from an endpoint, 'subscribes' the component to the cached data, and reads the request status and cached data from the Redux store.</dd>
                <dt>useQuerySubscription</dt>
                <dd>Returns a refetch function and accepts all hook options. Automatically triggers fetches of data from an endpoint, and 'subscribes' the component to the cached data.</dd>
                <dt>useQueryState</dt>
                <dd>Returns the query state and accepts skip and selectFromResult. Reads the request status and cached data from the Redux store.</dd>
                <dt>useLazyQuery</dt>
                <dd>Returns a tuple with a trigger function, the query result, and last promise info. Similar to useQuery, but with manual control over when the data fetching occurs. Note: the trigger function takes a second argument of preferCacheValue?: boolean in the event you want to skip making a request if cached data already exists.</dd>
                <dt>useLazyQuerySubscription</dt>
                <dd>Returns a tuple with a trigger function, and last promise info. Similar to useQuerySubscription, but with manual control over when the data fetching occurs. Note: the trigger function takes a second argument of preferCacheValue?: boolean in the event you want to skip making a request if cached data already exists.</dd>
            </dl>
            <p>In practice, the standard useQuery-based hooks such as useGetPostQuery will be the primary hooks used in your application, but the other hooks are available for specific use cases.</p>
            <h3>Query Hook Options</h3>
            <p>The query hooks expect two parameters: (queryArg?, queryOptions?).</p>
            <p>The queryArg param will be passed through to the underlying query callback to generate the URL.</p>
            <p>The queryOptions object accepts several additional parameters that can be used to control the behavior of the data fetching:</p>
            <dl>
                <dt>skip</dt>
                <dd>Allows a query to 'skip' running for that render. Defaults to false</dd>
                <dt>pollingInterval</dt>
                <dd>Allows a query to automatically refetch on a provided interval, specified in milliseconds. Defaults to 0 (off)</dd>
                <dt>selectFromResult</dt>
                <dd>Allows altering the returned value of the hook to obtain a subset of the result, render-optimized for the returned subset.</dd>
                <dt>refetchOnMountOrArgChange</dt>
                <dd>Allows forcing the query to always refetch on mount (when true is provided). Allows forcing the query to refetch if enough time (in seconds) has passed since the last query for the same cache (when a number is provided). Defaults to false</dd>
                <dt>refetchOnFocus</dt>
                <dd>Allows forcing the query to refetch when the browser window regains focus. Defaults to false</dd>
                <dt>refetchOnReconnect</dt>
                <dd>Allows forcing the query to refetch when regaining a network connection. Defaults to false</dd>
            </dl>


            <h3>Frequently Used Query Hook Return Values</h3>
            <p>The query hook returns an object containing properties such as the latest data for the query request, as well as status booleans for the current request lifecycle state. Below are some of the most frequently used properties. Refer to useQuery for an extensive list of all returned properties.</p>
            <dl>
                <dt>data</dt>
                <dd>The latest returned result regardless of hook arg, if present.</dd>
                <dt>currentData</dt>
                <dd>The latest returned result for the current hook arg, if present.</dd>
                <dt>error</dt>
                <dd>The error result if present.</dd>
                <dt>isUninitialized</dt>
                <dd>When true, indicates that the query has not started yet.</dd>
                <dt>isLoading</dt>
                <dd>When true, indicates that the query is currently loading for the first time, and has no data yet. This will be true for the first request fired off, but not for subsequent requests.</dd>
                <dt>isFetching</dt>
                <dd>When true, indicates that the query is currently fetching, but might have data from an earlier request. This will be true for both the first request fired off, as well as subsequent requests.</dd>
                <dt>isSuccess</dt>
                <dd>When true, indicates that the query has data from a successful request.</dd>
                <dt>isError</dt>
                <dd>When true, indicates that the query is in an error state.</dd>
                <dt>refetch</dt>
                <dd>A function to force refetch the query</dd>
            </dl>
            <p>In most cases, you will probably read data and either isLoading or isFetching in order to render your UI.</p>
            <h3>Mutations</h3>
            <p>Below are some of the most frequently used properties on the "mutation result" object. Refer to useMutation for an extensive list of all returned properties.</p>
            <dl>
                <dt>data</dt>
                <dd>The data returned from the latest trigger response, if present. If subsequent triggers from the same hook instance are called, this will return undefined until the new data is received. Consider component level caching if the previous response data is required for a smooth transition to new data.</dd>
                <dt>error</dt>
                <dd>The error result if present.</dd>
                <dt>isUninitialized</dt>
                <dd>When true, indicates that the mutation has not been fired yet.</dd>
                <dt>isLoading</dt>
                <dd>When true, indicates that the mutation has been fired and is awaiting a response.</dd>
                <dt>isSuccess</dt>
                <dd>When true, indicates that the last mutation fired has data from a successful request.</dd>
                <dt>isError</dt>
                <dd>When true, indicates that the last mutation fired resulted in an error state.</dd>
                <dt>reset</dt>
                <dd>A method to reset the hook back to it's original state and remove the current result from the cache</dd>
            </dl>
            <h3>Writing Memoized Selectors with Reselect</h3>
            <p>Memoization is a form of caching. It involves tracking inputs to a function, and storing the inputs and the results for later reference. If a function is called with the same inputs as before, the function can skip doing the actual work, and return the same result it generated the last time it received those input values. This optimizes performance by only doing work if inputs have changed, and consistently returning the same result references if the inputs are the same.</p>
            <h4>createSelector(...)</h4>
            <p>Reselect provides a function called createSelector to generate memoized selectors. createSelector accepts one or more "input selector" functions, plus an "output selector" function, and returns a new selector function for you to use.</p>

            <hr/>
        </>
    )
}

export default Hooks;
