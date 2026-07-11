import menus from './component/tree view/data'
import './App.css'
import TreeView from './component/tree view'

function App() {


  return (
    <>
    <TreeView menus={menus}/>
    </>
  )
}

export default App
