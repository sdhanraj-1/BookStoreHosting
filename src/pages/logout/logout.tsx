import { putData } from "../../data/fetchDataFromDatabase";

export const Logout = async (): Promise<void> => {
	try {
		// Make a request to the server to handle the logout
		// const response = await fetch("http://localhost:3000/logout", {
		// 	method: "GET",
		// 	credentials: "include", // Include cookies in the request
		// });
		const mainpage = "logout";
		const response = await putData(mainpage, undefined, "GET", {});
		if (response.ok) {
			// Redirect to the login page on successful logout
			window.location.href = "/login";
		} else {
			console.error("Logout failed");
		}
	} catch (error) {
		console.error("Error during logout:", error);
	}
};
