import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className="search-bar">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input className="search-input" type="text" placeholder="Username, hashtag and story search" />
        </div>
    )
}

export default SearchBar