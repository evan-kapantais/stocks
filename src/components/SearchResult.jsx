const SearchResult = ({ match }) => {
	return (
		<li className='search-match-item'>
			<p>
				<b>{match['1. symbol']}</b>
			</p>
			<p>{match['2. name']}</p>
		</li>
	);
};

export default SearchResult;
