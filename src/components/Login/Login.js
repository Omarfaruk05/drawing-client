import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorElement, setErrorElement] = useState('');
    let from = location.state?.from?.pathname || "/art" ;

    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const onSubmit = async(data) => {
        const respons = await fetch('https://secret-meadow-28909.herokuapp.com/login',{
            method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await respons.json();
        reset();

        if(result.status === true){
            const token = result.user;
            localStorage.setItem('token', token)
            navigate(from, {replace: true})
        }
        else{
            setErrorElement(result.status);
        }
    };

    return (
        <div  className='pt-12 md:pt-24  bg-base-200'>
        <h2 className='text-center text-4xl text-primary font-semibold'>Please Login</h2>
        <div  className='flex justify-center  h-[100vh] md:h-[90vh]'>
            <div>
                <div className="card w-96">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="email" placeholder="Your Email" className="input input-bordered input-primary w-full max-w-xs"
                            {...register("email",{
                                required: {
                                    value: true,
                                    message:'Email is Requited'
                                },
                                pattern: {
                                    value:/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })} />
                            <label className="label">
                                {errors.email?.type === "required" && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === "pattern" && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    
                            </label>
                            <input type="Password" placeholder="Your Password" className="input input-bordered w-full max-w-xs" {...register("password",{
                            required: {
                                value: true,
                                message: 'Passowrd is Requirted'
                            },
                            minLength: {
                                value: 6,
                                message: 'Must be 6 characters or longer'
                            }
                            })} />
                            <label className="label">
                                {errors.password?.type === "required" && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === "minLength" && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                            <label><small className='text-red-500'>{errorElement}</small></label>
                            <input type={"submit"} value="Login"  className="btn btn-primary text-white font-bold w-full" />
                        </form>
                        <p><small>New to Doctors Portal ? <Link className='text-primary' to={"/register"}>Create New Account</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;