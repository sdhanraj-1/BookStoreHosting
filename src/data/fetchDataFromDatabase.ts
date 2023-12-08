import { API_BASE_URL } from "../../config";
export const fetchBooklistFromDatabase = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/booklist/${id}`);
    
    if (!response.ok) {
      // Handle non-successful responses (e.g., HTTP error codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the data
    return data;
  } catch (error) {
    // Handle any other errors that might occur during the fetch
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for the component to handle
  }
};

  
export const getData = async (
  mainpage: string,
  userid: string | undefined,
) => {
  const options = {
    method: "GET",
    headers: {
						"Content-Type": "application/json",
    },
  };
  const url = userid
    ? `${API_BASE_URL}/${mainpage}/${userid}`
    : `${API_BASE_URL}/${mainpage}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error for the calling code to handle
  }
};

export const putData = async (
  mainpage: string,
  userid: string | undefined,
  method:string,
  body: {},
  includeCredentials: boolean = false,
) => {
  const options: RequestInit & { credentials?: string } = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (includeCredentials) {
    options.credentials = 'include'; 
  }
  const url = userid
    ? `${API_BASE_URL}/${mainpage}/${userid}`
    : `${API_BASE_URL}/${mainpage}/`;
  console.log("url:",url);
  console.log("options:", options);
  console.log("method:", method);
  
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error for the calling code to handle
  }
};
