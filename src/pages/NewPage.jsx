import React, { useState } from 'react'
import To from './To'
import Header from '../components/Header'

function NewPage() {

    const[but, setBut] = useState(null)
    const [modalOpen, setIsModalOpen] = useState(false)
    const[fromEmail, setFromEmail] = useState("")
    const[message, setMessage] = useState('')
    const[subject, setSubject] = useState('')

    async function logout() {
        const response = await invoke("delete_smtp_credentials");
        alert(response);
        window.location.reload();
      }

      const submit = () => {
        setMessage('')
        setIsModalOpen(false)
      }

  return (
    <>
        <div className='bg-[url("https://orientflights.com/wp-content/uploads/2018/11/pattern-bg.png")] h-screen w-full'>
        <header>
            <div className='justify-end mt-1 flex mr-9'>
                <button
                onClick={logout}
                className='bg-red-500 p-3 rounded-2xl'>Logout</button>
            </div>
        </header>
        
        <div className='h-[93vh] w-full flex flex-col justify-center items-center'>
        
            <button 
                onClick={()=>setIsModalOpen(true)}
            className='bg-zinc-300 flex gap-1 h-auto w-auto rounded-3xl justify-center items-center py-2 px-3'>
                <img className='h-3 w-3 align-center items-center' src="https://brandeps.com/icon-download/P/Pen-icon-09.png" alt="" />
                COmpose EMail</button>


                {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 shadow-md flex items-center bg-zinc-700 justify-center">
                    <div className="bg-zinc-100 p-4 rounded-md w-[49vw] h-[79vh] max-w-full  relative">
                        <header className='flex justify-between  items-center mb-4 '>
                            <h2 className='text-xl font-semibold bg-zinc-200 p-2 rounded-lg'>Write</h2>
                            <button className='bg-red-200 p-2 rounded-lg' onClick={() => setIsModalOpen(false)} >
                                {/* <i className="ri-close-fill"></i> */}
                                X
                            </button>
                        </header>
                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            sendEmail();
                        }}>
                        
                        <div className="users-list flex flex-col  gap-2 max-h-99  p-8 overflow-auto">
                            <div className="users-list  flex items-center gap-2 px-5 overflow-auto">
                            {/* <h1>To: </h1> */}
                            {/* <input 
                                className="border-none border-b-2 border-gray-400 focus:outline-none underline p-1" 
                                type="text" 
                                placeholder="Enter Value"
                            /> */}
                            <To/>
                            </div>
                            <div className="w-[90vw] px-9 border-t-2 border-light-gray"></div>
                            <div className="users-list flex  items-center px-5 gap-2 max-h-96 overflow-auto">
                            <h1>From: </h1>
                            <input 
                                className="border-none bg-zinc-100 border-b-2 px-5 border-gray-400 focus:outline-none underline focus:border-blue-500 p-1" 
                                type="email" 
                                placeholder="Enter Value"
                                value={fromEmail}
                                onChange={(e) => setFromEmail(e.target.value)}
                            />
                            </div>
                            <div className="w-[90vw] px-9 border-t-2 border-light-gray"></div>
                            <div className="users-list flex items-center px-5 gap-2 overflow-auto">
                            <h1>Subject: </h1>
                            <input 
                                value={subject}
                                className="border-none bg-zinc-100 border-b-2 border-gray-400 focus:outline-none underline focus:border-blue-500 p-1" 
                                type="text" 
                                placeholder="Enter Value"
                                onChange={(e)=> setSubject(e.target.value)}
                            />
                            </div>
                            <div className="flex flex-col items-center p-5 overflow-auto">
                            <h1 className='items-start'>Body: </h1>
                            <textarea 
                            value={message}
                            className="w-full px-9 py-4  h-[25vh] mt-3 border-2 border-gray-300 rounded-md p-2 resize-none" 
                            placeholder="Enter your message"
                            onChange={(e) => setMessage(e.target.value)}
                            />

                            </div>
                            <div className='justify-end flex items-end'>
                                <button
                                type='submit'
                                // onSubmit={submit}
                                onClick={submit}
                                className=' bg-blue-400 mr-9 p-2 rounded-xl'>Submit</button>
                            </div>

                        </div>

                        </form>
                        
                    </div>
                </div>
            )}
        </div>
        </div>
    </>
  )
}

export default NewPage
