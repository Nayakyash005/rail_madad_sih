export async function getAllUsers() {
    const res = await fetch(process.env.REACT_APP_SERVER_URL+ "/api/user/all", {credentials: "include"});

    if(res.ok) {
        const data = await res.json();

        if(data.success) {
            return data.data;
        }
    }

    return [];
}