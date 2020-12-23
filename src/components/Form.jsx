const Form = (props) => {
	return (
		<div className='form-wrapper'>
			<div>
				<h1>Add Stock</h1>
				<form id='search-form' onSubmit={props.fetchSymbol}>
					<input
						type='search'
						placeholder='Search stock symbol...'
						value={props.value}
						onChange={(e) => props.setValue(e.target.value)}
					/>
					<button type='submit'>Search</button>
				</form>
				<p>{props.message}</p>
			</div>
		</div>
	);
};

export default Form;
