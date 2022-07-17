import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorElement, setErrorElement] = useState('');
    let from = location.state?.from?.pathname || "/art" ;

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async(data) => {

        const respons = await fetch('https://secret-meadow-28909.herokuapp.com/register',{
            method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await respons.json();
        
        reset();
        if(result.status === true){
            navigate(from, {replace: true})
        }
        else{
            setErrorElement(result.status);
        }
    } 


    return (
        <div className='bg-base-200'>
        <div className='pt-12 md:pt-24'>
            <h2 className='text-center text-4xl text-primary font-semibold'>Please Register</h2>
            <div className='flex justify-center h-[100vh] md:h-[90vh]'>
                <div className="card w-96">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="name" placeholder="Your Name" className="input input-bordered input-primary w-full max-w-xs"
                            {...register("name",{
                                required: {
                                    value: true,
                                    message:'Name is Requited'
                                }
                            })} />
                            <label className="label">
                                {errors.name?.type === "required" && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                {errors.name?.type === "pattern" && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
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
                            <input type="password" placeholder="Your Password" className="input input-bordered input-primary w-full max-w-xs"
                            {...register("password",{
                                required: {
                                    value: true,
                                    message:'Email is Requited'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be 6 characters or longer'
                                }
                            })} />
                            <label className="label">
                                {errors.password?.type === "required" && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === "minLength" && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                            {errorElement}
                            <input type={"submit"} value="Register"  className="btn btn-primary text-white font-bold w-full" />
                        </form>
                        <p><small>Already have an account ? <Link className='text-primary' to={"/login"}>Please Login</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;