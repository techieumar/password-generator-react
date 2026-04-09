        import {useCallback,useState,useEffect, useRef} from "react";


        function App() {
          const [length,setLength] = useState(8);
          const [numbersAllowed,setNumbersAllowed] = useState(false);
          const [charAllowed,setCharAllowed] = useState(false);
          const [password,setPassword] = useState("");
          const [darkMode, setDarkMode] = useState(true);

          const passwordRef=useRef(null)


          const generatePassword = useCallback(() => {
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if(charAllowed) chars += "!@#$%^&*()-+=_";
            if(numbersAllowed) chars += "0123456789";

            let generatedPassword = "";
            for(let i=0;i<length;i++){
              const randomIndex = Math.floor(Math.random() * chars.length);
              generatedPassword += chars[randomIndex];
            }
            setPassword(generatedPassword);
          },[length,numbersAllowed,charAllowed,setPassword]);
          
            const handleClick = () => {
            passwordRef.current.select();
            window.navigator.clipboard.writeText(password);
            alert("Password copied to clipboard!");
            }

            const toggleTheme = () => {
              setDarkMode(prev => !prev);
            };

          useEffect(() => {
            generatePassword();
          },[length,numbersAllowed,charAllowed])
          return (
            <div className={darkMode ? "bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
            <div
              className={`w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 
              ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
              >   
              <button
    onClick={toggleTheme}
    className="mb-3 px-3 py-1 rounded bg-blue-500 text-white"
  >
    {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
  </button>
              <h1 className='text-lg  text-center my-3'>Password generator</h1>
              <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input
                    type="text"
                    value={password}
                    className="outline-none w-full py-1 px-3"
                    placeholder="Password"
                    readOnly
                    ref={passwordRef}
                /> 
                <button
                    onClick={handleClick}
                className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
                >copy</button> 
            </div>
            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                min={8}
                max={50}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
                  />
                  <label>Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={numbersAllowed}
                  id="numberInput"
                  onChange={()=>{
                      setNumbersAllowed((prev) => !prev)
                  }}  
              />
              <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                  <input
                      type="checkbox"
                      defaultChecked={charAllowed}
                      id="characterInput"
                      onChange={() => {
                          setCharAllowed((prev) => !prev )
                      }}
                  />
                  <label htmlFor="characterInput">Characters</label>
              </div>
              </div>
            </div>
            </div>
          )
        }
        export default App;