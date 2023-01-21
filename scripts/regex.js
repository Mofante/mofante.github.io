const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const userNameRegex =
	/^(?=.{5,12}$)[A-Z]{1}[a-zA-Z0-9\.\-\_].*[0-9!-\/:-@\[-\`{-~]{1,}$/;
const passwordRegex =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!-\/:-@\[-\`{-~]).{12,}$/;
const nameRegex = /^[A-Za-z]+$/;
