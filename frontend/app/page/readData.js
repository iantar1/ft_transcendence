

export const readData = (function() {
    let data = [];

    return {
        getData: function() {
            // console.log(data);
            return data;
        },
        setData: function(newData) {
        console.log('inside fetchuserdata');
            console.log(data);
        data = newData;
        // console.log(data);
        },
        addData: function(item) {
            data.push(item);
        }
    };
})();

export async function fetchUserData() {
    try {
        // Make a GET request to the API
        const res = await fetch("http://localhost:8000/user/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies along with the request
        });

        // Check if the response is successful
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }

        // Parse the response JSON to an array
        const data = await res.json();

        // Return the fetched data (which will be an array)
        return data;
    } catch (error) {
        console.error("Error in fetchUserData:", error);
        return []; // Return an empty array in case of an error
    }
}
