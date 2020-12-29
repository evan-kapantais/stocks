const Form = (props) => {
	return (
		<div className='form-wrapper'>
			<div className='form-container'>
				<form id='search-form' onSubmit={props.fetchSymbol}>
					<input
						type='search'
						placeholder='Search stock symbol...'
						id='search-stock-input'
						value={props.value}
						onChange={(e) => props.setValue(e.target.value)}
					/>
					<button type='submit' className='main-button'>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default Form;
