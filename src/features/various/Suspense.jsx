import { useContext } from "react"
import { ThemeContext } from '../../app/ThemeContext';

const Suspense = () => {
    const suspenceTag = '<Suspense>';
    const {theme} = useContext(ThemeContext);
  return (
    <>
        <h3 className={theme}><a href='https://react.dev/reference/react/Profiler'>Suspense</a></h3>
        <div>{suspenceTag} lets you display a fallback until its children have finished loading.</div>
        <hr/>
    </>
  )
}

export default Suspense
