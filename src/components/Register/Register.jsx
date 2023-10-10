import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleRegisterbtn = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target?.email?.value;
        const password = e.target?.password?.value;
        const accepted = e.target.terms.checked;

        console.log(name, email, password, accepted);
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("You should not use UPPERCASE letter");
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms & condition.')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if(result.user.emailVerified){
                    setSuccess("Registration Successful.")
                }
                else
                {
                    alert("Please verify your email");
                }
                

            // update user profile
            updateProfile(result.user)
            .then(() =>{
                console.log("Profile updated")
            })
            // email verification
            sendEmailVerification(result.user)
            .then(()=> {
                alert("Please verify your email.")
            })
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);

            })
    }

    return (
        <div className=" mx-auto w-3/5">
            <div className=" text-3xl text-center my-14">Resgister your account</div>
            <form onSubmit={handleRegisterbtn} className=" p-2 ">
                
                    <input className="border-2 mb-3 p-2 w-full" type="name" name="name" placeholder="Your name" required /> <br />
                    <input className="border-2 mb-3 p-2 w-full" type="email" name="email" placeholder="Enter your email" required /> <br />
                <div className="relative">    
                    <input className="border-2 mb-3 p-2 w-full"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        required /> <br />
                    <span className="absolute bottom-6 right-2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>}
                    </span>
                </div>
                <div className="my-5">
                    <input className="mr-3" type="checkbox" name="terms" id="terms" />
                    <label  htmlFor="terms">Accept our <a href="#">term & condition</a></label>
                </div>
                <button className="btn btn-warning w-full text-white ">Register</button>
                <p>Already Have an account? Please <Link to="/login" className="text-blue-700 underline">Login</Link></p>
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p className="text-green-700">{success}</p>
            }
        </div>
    );
};

export default Register;