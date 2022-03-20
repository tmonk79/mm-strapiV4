
export function getStrapiURL(path = "") {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://api.dessertcorner.com"
    }${path}`;
  }
  
  // Helper to make GET requests to Strapi
  export async function fetchAPI(path,token) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl, {
        method: 'get',
        headers: {
            Authorization: "Bearer "+token
        }
    });
    const data = await response.json();
    return data;
  }