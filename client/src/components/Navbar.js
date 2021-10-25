import React , {useState} from 'react';
import { FaHome } from 'react-icons/fa';
import { BsPlusSquareFill } from 'react-icons/bs';
import { GiHoneyJar } from 'react-icons/gi';



export default function Navbar() {
    const [currentUser, setCurrentUser] = useState("1")
    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 bg-white rounded">
                <a className="navbar-brand" href="/"><GiHoneyJar/> TipCurators</a>
                <div style={{display:'flex'}} className=" nav-item dropdown ms-auto">
                    <li style={{listStyle:'none'}} className="nav-item ms-auto">
                        
                        <a  className="nav-link" href="/">
                            < FaHome/> Home
                        </a>
                    </li>
                    {
                        currentUser != null ?
                            (<div>
                                <li className="flex-container" style={{listStyle:'none' , fontSize:'18px',marginTop:'2px',marginLeft:'15px'}}>
                                
                                        <a className=" dropdown-item" href="/createpost"><BsPlusSquareFill/> New Post</a>
                                        <div className=" dropdown-item" >Address</div>
                                </li>
                            </div>)
                            :
                            (
                                <div>
                                    <li className="flex-container" style={{listStyle:'none' , fontSize:'18px',marginTop:'2px',marginLeft:'15px'}}>
                                        <a className=" dropdown-item" href="/signin">Sign In</a>
                                        <a className=" dropdown-item" href="/signup">Sign Up</a>
                                    </li>
                                </div>
                            )
                    }
                    
                </div>
            </nav>
        </div>
    )
}
