const TextButton = ({ children, onClick }) => {
	return (
		<button class='text-button' type='button'>
			{children}
		</button>
	);
};

export default TextButton;
