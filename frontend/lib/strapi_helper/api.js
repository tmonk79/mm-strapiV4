import https from 'https'

export function getStrapiURL(path = "") {
    return `${
      process.env.STRAPI_API || "https://api.dessertcorner.com"
    }${path}`;
  }
  
  // Helper to make GET requests to Strapi
  export async function fetchAPI(path,token) {
    const requestUrl = getStrapiURL(path);
    const httpsAgent = new https.Agent({  
      rejectUnauthorized: false
    });
    const response = await fetch(requestUrl, {
        method: 'get',
        headers: {
              Authorization: "Bearer "+token,
             
          },
          // agent: httpsAgent,
    });
    const data = await response.json();
    return data;
  }
