import React, { useState } from 'react';

function To() {
    const [selectedOption, setSelectedOption] = useState('');
    const [inputs, setInputs] = useState({
        to: '',
        cc: '',
        bcc: ''
    });

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    return (
        <div className="users-list flex items-center gap-2 overflow-auto">
            <h1>To: </h1>
            <input 
                className="border-none border-b-2 border-gray-400 focus:outline-none underline p-1" 
                type="email" 
                placeholder="Enter Value"
                value={inputs.to}
                name="to"
                onChange={handleInputChange}
            />

            <select 
                className="border-none border-b-2 border-gray-400 focus:outline-none underline p-1"
                value={selectedOption}
                onChange={handleDropdownChange}
            >
                <option value="">Select</option>
                <option value="cc">CC</option>
                <option value="bcc">BCC</option>
            </select>

            {/* Conditionally render CC and BCC input fields */}
            {selectedOption === 'cc' && (
                <div className="flex items-center gap-2">
                    <h1>CC: </h1>
                    <input 
                        className="border-none border-b-2 border-gray-400 focus:outline-none underline p-1" 
                        type="text" 
                        placeholder="Enter CC Email"
                        value={inputs.cc}
                        name="cc"
                        onChange={handleInputChange}
                    />
                </div>
            )}

            {selectedOption === 'bcc' && (
                <div className="flex items-center gap-2">
                    <h1>BCC: </h1>
                    <input 
                        className="border-none border-b-2 border-gray-400 focus:outline-none underline p-1" 
                        type="text" 
                        placeholder="Enter BCC Email"
                        value={inputs.bcc}
                        name="bcc"
                        onChange={handleInputChange}
                    />
                </div>
            )}
        </div>
    );
}

export default To;
