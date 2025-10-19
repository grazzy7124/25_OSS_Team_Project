import { useNavigate } from 'react-router-dom';

const Login = ()=> {
    const navigate = useNavigate();

    return (
        
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h2 className="text-center mb-3">Login</h2>
                <div>
                    <input className='form-control mb-2' placeholder="email"></input>
                </div>
                <div>
                    <input className='form-control mb-3' placeholder="password"></input>
                </div>
                <div>
                    <button 
                        className='btn btn-primary'
                        onClick={() => navigate('/main')}
                    >
                        Submit
                    </button>
                </div>
            </div>
            
        </>
    );
};

export default Login;