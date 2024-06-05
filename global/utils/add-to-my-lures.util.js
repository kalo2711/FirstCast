import { environment } from "../environment";
import { getAuthToken } from "./auth.utils";
export async function addToMyLures(lureID, onPass, onFail, onFailDuplicate) {
    try {
        const url = environment.host + '/api/add-to-user-lures'
        const token = await getAuthToken()
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ lureOption: lureID }),
            headers: {
                'Content-Type': 'application/json',
                'x-app-auth': token
            },
        });
        const json = await response.json();
        if (json?.error?.code === 'ER_DUP_ENTRY') {
            onFailDuplicate();
            return
        }
        if (!json || json?.error) {
            const errorMsg = json?.error ? json.error : 'AddToUserLures failed.';
            throw new Error(errorMsg)
        }
        onPass();
    }
    catch (e) {
        console.error(e.stack);
        onFail();
    }
}