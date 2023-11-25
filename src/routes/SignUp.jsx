import { useState, useEffect } from "react"
import { User } from "../utils/validation";
import Api from "../utils/api";
import { z } from "zod";
import { Link } from "react-router-dom"

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [zodErrors, setZodErrors] = useState(null);
  const [isPasswordsEquals, setIsPasswordsEquals] = useState(true);
  const [isUserExist, setIsUserExist] = useState(false);

  useEffect(() => {
    setIsUserExist(false);
  }, [email]);
  

  function handleSignUp() {
    try {
      fetch(`http://localhost:3000/users?email=${email}`)
        .then(r => r.json())
        .then(users => {
          if(users.length > 0){
            setIsUserExist(true);
            throw new Error("");
          }
      })
      
      const user = User.parse({email, password, date: Date.now()});

      if (password !== repeatPassword) {
        setIsPasswordsEquals(false);
        throw new Error("");
      }
      
      Api.createUser(user);
      
      setIsUserExist(false);
      setIsPasswordsEquals(true);
      setZodErrors(null);
    } catch(err) {
      if (err instanceof z.ZodError) {
        setZodErrors(err.format());
      }
    }
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold py-3 mt-28">Sign up</h1>
      
      <form action="#" className='flex flex-col gap-3 w-96 mx-auto'>
        
        <input 
          className="pl-1 h-10 border-solid border-black border-2" 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)}
        />
        {zodErrors?.email && <h3 className="font-medium text-red-600">Введите правильный email</h3>}
        {isUserExist && <h3 className="font-medium text-red-600">Пользователь с таким email уже существует</h3>}
        
        <input 
          className="pl-1 h-10 border-solid border-black border-2" 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}
        />
        {zodErrors?.password && <h3 className="font-medium text-red-600">{"Пароль не надежен (Длина пароля >= 8 символам;\nПароль содержит хотя бы одну заглавную букву;\nПароль содержит хотя бы одну строчную букву;\nПароль содержит хотя бы одну цифру.)"}</h3>}
        
        <input 
          className="pl-1 h-10 border-solid border-black border-2" 
          type="password" placeholder="Repeat password" 
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {!isPasswordsEquals && <h3 className="font-medium text-red-600">Пароли отличаются</h3>}
        
        <button className="h-10 border-solid border-black border-2 hover:bg-slate-300" onClick={handleSignUp}>Sign up</button>
  
        <Link className="underline" to="/login">Уже есть аккаунт?</Link>        
      </form>
    </div>
  )
}