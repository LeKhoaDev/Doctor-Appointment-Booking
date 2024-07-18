/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';

import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        // WYoGCIUm378iFuihP
        // template_sgpgane
        // service_es1vjp4

        emailjs.send(
            "service_es1vjp4",
            "template_sgpgane",
            {
                from_name: form.name,
                to_name: 'KhoaLe',
                from_email: form.email,
                to_email: 'lephamanhkhoa201203@gmail.com',
                message: form.message
            },
            'WYoGCIUm378iFuihP'
        )
            .then(() => {
                setLoading(false)
                alert('Thank you. I will get back to you asa soon as possible.')

                setForm({
                    name: "",
                    email: "",
                    message: ""
                })
            }, (error) => {
                setLoading(false)

                console.log(error)

                alert('Something went wrong.')
            })
    }

    return (
        <section>
            <div className='px-4 mx-auto max-w-screen-md'>
                <h2 className='heading text-center'>Contact Us</h2>
                <p className='mb-8 lg:mb-16 font-light text-center text__para'>
                    Got a technical issue? Want to send feedback about a beta feature? Let us know.
                </p>
                <form action="#" className='space-y-8' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className='form__label'>
                            Your Email
                        </label>
                        <input type="email" id='email' placeholder='example@gmail.com' className='form__input mt-1' name='email' value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="subject" className='form__label'>
                            Your Name
                        </label>
                        <input type="text" id='subject' placeholder='May I get your name?' className='form__input mt-1' name='name' value={form.name} onChange={handleChange} />
                    </div>
                    <div className='sm:col-span-2'>
                        <label htmlFor="message" className='form__label'>
                            Your Message
                        </label>
                        <textarea rows='6' type="text" placeholder='Leave a comment...' className='form__input mt-1' name='message' value={form.message} onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn rounded sm:w-fit' >{loading ? 'Submiting...' : 'Submit'}</button>
                </form>
            </div>
        </section>
    )
}

export default Contact
