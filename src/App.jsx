import { useState } from 'react';
import StateCounter from './features/counter/StateCounter';
import Counter from './features/counter/Counter';
import Numbers from './features/numbers/Numbers';
import Hooks from './features/hooks/Hooks';
import ProfilerComponent from './features/various/Profiler';
import SuspenseComponent from './features/various/Suspense';
import { ThemeContext } from './app/ThemeContext';
import './App.css'
import Posts from './features/posts/Posts';
import Posts3 from './features/posts/Posts3';
import Selectors from './features/selectors/Selectors';

const App = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>  
      <StateCounter/>
      <Counter />
      <Numbers />
      <Hooks />
      <Posts />
      <Posts3 />
      <Selectors/>
      <ProfilerComponent />
      <SuspenseComponent />
    </ThemeContext.Provider>


  );
}
export default App;


