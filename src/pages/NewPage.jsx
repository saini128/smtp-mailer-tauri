import React, { useState, useRef } from 'react'
import To from './To'
import Header from '../components/Header'
import JoditEditor from 'jodit-react'

function NewPage() {
    const [but, setBut] = useState(null)
    const [modalOpen, setIsModalOpen] = useState(false)
    const [fromEmail, setFromEmail] = useState("")
    const [message, setMessage] = useState('')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };
    
    const editor = useRef(null)

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
                    onClick={() => setIsModalOpen(true)}
                    className='bg-zinc-300 flex gap-1 h-auto w-auto rounded-3xl justify-center items-center py-2 px-3'>
                    <img className='h-3 w-3 align-center items-center' src="https://brandeps.com/icon-download/P/Pen-icon-09.png" alt="" />
                    Compose Email
                </button>

                {modalOpen && (
                    <div className="fixed overflow-x-hidden inset-0 bg-black bg-opacity-40 shadow-md flex items-center bg-zinc-700 justify-center" >
                    <div className="bg-zinc-100 overflow-x-hidden p-4 rounded-md w-full sm:w-[90vw] md:w-[70vw] lg:w-[49vw] relative h-[82vh] max-h-[90vh] overflow-y-auto">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold bg-zinc-200 p-2 rounded-lg'>Write</h2>
                            <button className='bg-red-200 p-2 rounded-lg' onClick={() => setIsModalOpen(false)}>
                                X
                            </button>
                        </header>
                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}>
                            <div className="users-list flex flex-col gap-2 p-8">
                                <div className="users-list flex items-center gap-2 px-5">
                                    <To />
                                </div>
                                <div className="w-[90vw] px-9 border-t-2 border-light-gray"></div>
                                <div className="users-list flex items-center px-5 gap-2 max-h-96">
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
                                <div className="users-list flex items-center px-5 gap-2">
                                    <h1>Subject: </h1>
                                    <input 
                                        value={subject}
                                        className="border-none bg-zinc-100 border-b-2 border-gray-400 focus:outline-none underline focus:border-blue-500 p-1" 
                                        type="text" 
                                        placeholder="Enter Value"
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center p-5">
                                    <h1 className='items-start'>Body: </h1>
                                    <div className="w-full h-full  resize-none">
                                        <JoditEditor
                                            className="w-full px-1 py-1 h-[25vh] mt-3 border-2 border-gray-300 rounded-md p-2 resize-none"
                                            ref={editor}
                                            value={content}
                                            onChange={newContent => setContent(newContent)}
                                            style={{ resize: "none", overflow: "hidden" }}
                                        />
                                        <div 
                                            onClick={toggleContent} 
                                            className={`cursor-pointer ml-3 flex transition-all duration-300 opacity-50 mt-3 bg-zinc-400 flex justify-center items-center w-5 h-5 rounded-md ${isOpen ? 'opacity-100' : ''}`}>
                                            {isOpen ? 'X' : 'O'}
                                        </div>
                                    </div>
                                </div>
                                {/* <div
                                    className={`transition-all duration-300 mt-3 h-0 bg-zinc-400 ${isOpen ? 'w-full h-auto p-4 opacity-100 min-h-12' : 'w-0 h-0'}`}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {isOpen && (
                                        <div className='items-center h-auto justify-center flex overflow-hidden'>
                                        <div className='max-w-full max-h-full overflow-auto'>
                                            {content}
                                        </div>
                                    </div>
                                    
                                    )}
                                </div> */}
                                <div
                                    className={`transition-all duration-300 mt-3 bg-zinc-400 ${isOpen ? 'w-full h-auto opacity-100 p-4 min-h-12' : 'w-0 h-0 opacity-0'}`}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {isOpen && (
                                        <div className='items-center h-auto justify-center flex overflow-hidden'>
                                            <div className='max-w-full max-h-full overflow-auto'>
                                                {content}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='justify-end flex items-end'>
                                    <button
                                        type='submit'
                                        onClick={submit}
                                        className='bg-blue-400 mr-9 p-2 rounded-xl'>Submit</button>
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

export default NewPage;
