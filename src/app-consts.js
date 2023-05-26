// ============================================================================================
//                                      Data for Form Fields
// ==============================================================================================

export const api = {
	BASE_URL: 'https://groops.azurewebsites.net/api'
}

export const loginFormFields = [
	{ title: 'telephone', inputType: 'text', isMandatory: true },

];

// ============================================================================================
//                                      Data for Buttons
// ==============================================================================================

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
