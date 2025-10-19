import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/App/Main';
import Detail from './components/App/Detail';
import Edit from './components/App/Edit';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/main' element={<Main/>}/>
                <Route path='/detail/:id' element={<Detail/>}/>
                <Route path='/edit/:id' element={<Edit/>}/>
            </Routes>
        </Router>
    );
}

export default AppRouter;