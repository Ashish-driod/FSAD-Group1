export const registerUserToDB = async (user)=>{
    const url = '/fitness-tracker/registerUser'; // Replace with your API endpoint
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(user) // Convert the payload to JSON string
    });
    const data = await response.json();
    console.log(data);
    return data;
}