export function useFetch(url, method, accessToken, accessTokenSecret, bodyContent, setLoading){

  const headers = {
    method: method,
    headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
        "Access-Token-Secret": accessTokenSecret
    },
    ...(bodyContent != null ) && {body: JSON.stringify(bodyContent)}
  }

  setLoading(true);

  return fetch(url, headers)
            .then((response) => {
                if(!response.ok) {
                    setLoading(false);
                    throw new Error(response.status)
                }
                else return response.json();
            })
            .then((data) => {
                setLoading(false);
                return data;
                // Should return data here
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
};