import './mailList.css'

export const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailtitle">Subscribe our news!</h1>
        <span className="mailDesc">Subscribe to best prices</span>
        <div className="mailInputContainer">
            <input type="mail"  placeholder='Your Email'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}
