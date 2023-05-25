// ============================================================================================
//                                      Data for Form Fields
// ==============================================================================================

export const loginFormFields = [
	{ title: 'email', inputType: 'text', isMandatory: true },
	{ title: 'password', inputType: 'password', isMandatory: true },
	{ title: 'telephone', inputType: 'text', isMandatory: false },
	{ title: 'username', inputType: 'text', isMandatory: true },
];
export const subscribeFormFields = [
	{ title: 'email', inputType: 'text', isMandatory: true },
	{ title: 'password', inputType: 'password', isMandatory: true },
	{ title: 'email', inputType: 'text', isMandatory: false },
	{ title: 'email', inputType: 'text', isMandatory: true },
];

// ============================================================================================
//                                      Data for Backgrounds
// ==============================================================================================

export const BackgroundPages = [
	{
		title: 'Login',
		imageUrl:
			'https://www.drupal.org/files/project-images/reg_confirm_email_with_button_0.png',
		squareColor: 'grey',
	},
	{
		title: 'Sign Up',
		imageUrl:
			'https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif',
		squareColor: 'black',
	},
	{
		title: 'Subscribe',
		imageUrl: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c50d.png',
		squareColor: 'orange',
	},
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
		title: 'Done',
		isSelected: null,
		toLocation: '/done',
	},
	{
		title: 'History',
		isSelected: null,
		toLocation: '/history',
	},
    {
		title: 'Logout',
		isSelected: null,
		toLocation: '/login',
	},

];
