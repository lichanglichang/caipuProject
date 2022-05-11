import React from 'react';
import ThemeContext from './MyContext';
import PersonalNote	from '../PersonalNote';
function Propose() {
	const cliStatue = React.useContext(ThemeContext);
	return (
		<div style={{ display: (cliStatue === 'biji' ? 'block' : 'none') }}>
			<PersonalNote></PersonalNote>
		</div>
	);
}
export default Propose;