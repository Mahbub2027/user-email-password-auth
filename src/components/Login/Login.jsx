import {  sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
        const [success, setSuccess] = useState();
        const [registerError, setRegisterError] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setRegisterError('');
        setSuccess('');


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if(result.user.emailVerified){
                    setSuccess("Log in successfully")
                }
                else
                {
                    alert("Please verify your email");
                }
            
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }
    const emailRef = useRef();

    const handleForgetEmail= () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log("Send email successfully", emailRef.current.value);
        return;
        }
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
            console.log("Please provide valid email");
            return;
        }

        // reset email
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Please check your email")
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    
    

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" 
                            name="email" 
                            placeholder="email" 
                            ref={emailRef}
                            className="input input-bordered" 
                            required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetEmail} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p>New to this website. Please <Link to="/register" className="text-blue-700 underline">Register</Link></p>
                    </form>
                    {
                        registerError && <p className="text-red-700">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-700">{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;