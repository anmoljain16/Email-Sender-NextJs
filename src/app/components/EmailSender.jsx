"use client"
import React, { useState } from 'react';
import './EmailSender.css'
import axios from 'axios';

function EmailSender() {
    const [recipient, setRecipient] = useState('');
    const[subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const[password,setPassword] = useState('')
    const[message,setMessage] = useState({
        error:'',
        success:''
    })
    const[loading,setLoading] = useState(false)
    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };


    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSendEmail = async (e) => {

        e.preventDefault();
        // console.log(e.target)
        setLoading(true)
        if(recipient==='' || content===''){
            setMessage({error:'Please fill all fields',success:''})
            setLoading(false)
            return
        }
        if(password!=='Anmol@123'){
            setMessage({error:'Wrong Password',success:''})
            setLoading(false)
            return
        }
        try {
            // Make a POST request to your backend endpoint with recipient and content data
            const response = await axios.post('api/send-email', {
                recipient,
                content,
                subject,
            });

            // console.log(response);
            if (response.data.error === false) {
                setMessage({success:response.data.message,error:''})
            } else {
                // Email sending failed
                setMessage({error:response.data.message,success:''})
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setMessage({error:'Email sending failed due to some error',success:''})

        }

        setRecipient('');
        setContent('');
        setSubject('');

        setLoading(false)

    };


    return (

        <div className="container">
            <h2>Email Sender</h2>
            <div className="message">
                {message.error===''?null:<div className="error">{message.error}</div>}
                {message.success===''?null:<div className="success">{message.success}</div>}
            </div>
            <form>
                <label htmlFor="recipient">Recipient:</label>
                <input
                    type="email"
                    placeholder="******@gmail.com"
                    id="recipient"
                    value={recipient}
                    onChange={handleRecipientChange}
                />
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e)=>setSubject(e.target.value)}
                />

                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    placeholder="Enter email content"
                    value={content}
                    onChange={handleContentChange}
                />

                <label htmlFor="adminPassword">Admin Password:</label>
                <input
                    type="password"
                    id="adminPassword"
                    placeholder="Enter admin password"
                    onChange={(e)=>setPassword(e.target.value)}
                />

                {loading?<button type="submit" className="disable-btn" disabled>Loading...</button>:<button type="submit" className="disabled-btn" onClick={handleSendEmail}>Send Email</button> }
            </form>
        </div>
    );
}

export default EmailSender;
