import current from "./CurrentUser";

export default async function getAllCustomers() {
    const baseUrl = process.env.URL;
    const currentUser = await current()
    
    try {
      if(!(currentUser?.user_type == 'admin')) {
        throw new Error(`ERROR: User is not admin authorized.`);
      }
      const res = await fetch(`${baseUrl}/api/customer`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        console.error(res);
        throw new Error(`ERROR: could not retrieve customers`);
      }
    
      return res.json();
    } catch(error) {
      console.error(error)
      return null;
    }
  } 
  