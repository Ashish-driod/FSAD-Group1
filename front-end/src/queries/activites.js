export const getAllActivities = async (userId)=> {
    const response = await fetch(`/fitness-tracker/getAllAcvt?userId=${userId}`);
    const data = await response.json();
    console.log(data);
    return data;
}


export const getFormattedDate = (dateStr) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '-' + mm + '-' + yyyy
}

export const createActivities = async (payload) => {

    const url = '/fitness-tracker/addActivity/69'; // Replace with your API endpoint
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(payload) // Convert the payload to JSON string
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
    m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
    return `${h}hr:${m}min`;
}