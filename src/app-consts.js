
export const api = {
	BASE_URL: 'https://groops.azurewebsites.net/api'
}

export const loginFormFields = [
	{ title: 'telephone', inputType: 'text', isMandatory: true },

];

export const NavbarLinks = [
	{
		title: 'To do',
		isSelected: null,
		toLocation: '/tasks',
	},
	{
		title: 'History',
		isSelected: null,
		toLocation: '/history',
	},
    {
		title: 'Logout',
		isSelected: null,
		toLocation: '/',
		functionality: () => {
			localStorage.removeItem('token')
		}
		}
	

];
