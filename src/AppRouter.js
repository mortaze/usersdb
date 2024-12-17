import React from 'react'
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import App from './App';
import Add from './Add';
import Edite from './Edite';
import Delete from './Delete';
function AppRouter() {
  return (
<BrowserRouter>

<Routes>
<Route path= '/' element ={<App/>}/>
<Route path= '/create' element ={<Add/>} />
<Route path= '/Update/:id' element ={<Edite/>} />
<Route path= '/Delete/:id' element ={<Delete/>} />

</Routes>


</BrowserRouter>
  )
}

export default AppRouter