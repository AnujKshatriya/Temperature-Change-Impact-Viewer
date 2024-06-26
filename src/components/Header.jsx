import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import './stylesheet/Header.css'
const Header = () => {
    const [text] = useTypewriter({
        words: ['Temperature Change Impact Viewer', 'Fetch the data to get Result'],
        typeSpeed:100,
        deleteSpeed:100,
        loop:{},
    })
  return (
    <div className='header'>
        <div className="navbar">
            <img src="public/earth.jpg" alt="" />
            <h3>Temperature Change Impact Viewer</h3>
        </div>
        <div className="hero">
            <h1>
                <span className='autotext'>{text}</span>
                <span><Cursor/></span>
            </h1>
            <div className="paragraph">
                <p>Welcome to the Temperature Change Impact Viewer! Our cutting-edge platform harnesses data from the National Centers for Environmental Information (NCEI) to provide you with a comprehensive analysis of temperature changes across the globe. Simply input your desired time interval, country, and city name, and our intuitive interface will present the data in visually engaging formats.</p>
                <p > <span>Our visualizations include:</span><br/>
                <span>1. </span> Average Temperature Trends: See how the average temperatures have evolved over your selected period<span>.</span><br/>
                <span>2. </span> Minimum Temperature Variations: Understand the fluctuations in the lowest recorded temperatures<span>.</span><br/>
                <span>3. </span> Maximum Temperature Peaks: Track the highest temperatures and observe any extreme weather patterns<span>.</span></p>
                <p>Whether you're a climate researcher, student, or simply interested in understanding how temperatures are changing in your area, the Temperature Change Impact Viewer is your go-to tool for accurate and insightful climate data<span>.</span></p>
            </div>
        </div>
    </div>
  )
}

export default Header
