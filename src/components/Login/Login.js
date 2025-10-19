import { useNavigate } from 'react-router-dom';

const Login = ()=> {
    const navigate = useNavigate();

    return (
        
        <>
            <div className="container justify-content-center">
                <div>
                    <input placeholder="email"></input>
                </div>
                <div>
                    <input placeholder="password"></input>
                </div>
                <div>
                    <button onClick={() => navigate('/main')}>
                        Submit
                    </button>
                </div>
            </div>
            
        </>
    );
};

export default Login;