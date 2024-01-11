import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
     <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
           <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"linkedin.com/in/mohammad-razavi-64128a1ab"}
            >Built by MO R</Link>
          

        </p>
      </div>
    </footer>
  )
}
