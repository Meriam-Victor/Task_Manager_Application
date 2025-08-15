interface NavbarProps {
    token: string | null
    logout: () => void
}

function Navbar({ token, logout }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div>
          <h1>Task Manager</h1>
        </div>
        <div>
          {token ? (
            <button 
              onClick={logout} 
              className="btn-logout"
              title="Logout"
              aria-label="Logout"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Logout</span>
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default Navbar