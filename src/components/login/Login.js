import React, {useState} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import styles from './Login.module.css';

const Login = (props) => {
    const loc = useLocation();
    const [credentials, setCredentials] = useState({email : "", password : ""});
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const json = await response.json();
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Successfully Logged in", "success");
            history('/');
        }
        else {
            props.showAlert("Invalid Details", "danger");
        }
    }
    const onChange = (e) => {
        console.log(credentials);
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    return (
        <>   
            {/* <form className='my-5' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={onChange} value={credentials.email} type="email" className="my-1 form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="my-3 form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name='password' onChange={onChange} value={credentials.password} type="password" className="my-1 form-control" id="password" placeholder="Password" />
                </div>

                <button type="submit" className=" btn btn-primary">Submit</button>
            </form> */}
            <div className={styles.container}>
                <div className={styles.inputForm}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputItems}>
                            <Link  className= {`${loc.pathname === "/login" ? styles.loginActive : styles.login}`} to="/login" role="button">Login</Link>
                            <Link to="/signup" role="button" className={`${loc.pathname === "/signup" ? styles.loginActive : styles.login}`}>Signup</Link>
                        </div>
                        <div className={styles.inputFields}>
                            <form className={styles.input} onSubmit={handleSubmit}>
                                <div className={styles.inputCon}>
                                    <label>Email address</label>
                                    <input className={styles.inputItemsField} onChange={onChange} value={credentials.email} type="email" id="email" name='email' placeholder="Enter email"/>
                                </div>
                                <div className={styles.inputCon}>
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input className={styles.inputItemsField} name='password' onChange={onChange} value={credentials.password} type="password" id="password" placeholder="Password" />
                                </div>
                                <div className={styles.inputBtn}>
                                    <button className={styles.btn} type="submit" >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
