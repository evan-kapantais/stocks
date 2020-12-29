const Table = ({ title, data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>{title}</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(data).map((keyName, i) => (
					<tr key={i}>
						<td>{keyName}</td>
						<td>{data[keyName]}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
