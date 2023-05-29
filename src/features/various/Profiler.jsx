import { useContext } from "react"
import { ThemeContext } from '../../app/ThemeContext';

const Profiler = () => {
    const profilerTag = '<Profiler>';
    const {theme} = useContext(ThemeContext);
  return (
    <>
        <h3 className={theme}><a href='https://react.dev/reference/react/Profiler'>Profiler</a></h3>
        <div>{profilerTag} lets you measure rendering performance of a React tree programmatically.</div>
        <div>Measuring different parts of the application.</div>
        <div>Although {profilerTag} is a lightweight component, it should be used only when necessary. Each use adds some CPU and memory overhead to an application.</div>
        <p>Parameters</p>
        <ul>
            <li><strong>id</strong>: The string id prop of the {profilerTag} tree that has just committed. This lets you identify which part of the tree was committed if you are using multiple profilers.</li>
            <li><strong>phase</strong>: "mount", "update" or "nested-update". This lets you know whether the tree has just been mounted for the first time or re-rendered due to a change in props, state, or hooks.</li>
            <li><strong>actualDuration</strong>: The number of milliseconds spent rendering the {profilerTag} and its descendants for the current update. This indicates how well the subtree makes use of memoization (e.g. memo and useMemo). Ideally this value should decrease significantly after the initial mount as many of the descendants will only need to re-render if their specific props change.</li>
            <li><strong>baseDuration</strong>: The number of milliseconds estimating how much time it would take to re-render the entire {profilerTag} subtree without any optimizations. It is calculated by summing up the most recent render durations of each component in the tree. This value estimates a worst-case cost of rendering (e.g. the initial mount or a tree with no memoization). Compare actualDuration against it to see if memoization is working.</li>
            <li><strong>startTime</strong>: A numeric timestamp for when React began rendering the current update.</li>
            <li><strong>endTime</strong>: A numeric timestamp for when React committed the current update. This value is shared between all profilers in a commit, enabling them to be grouped if desirable.</li>
        </ul>
        
        <hr/>
    </>
  )
}

export default Profiler
