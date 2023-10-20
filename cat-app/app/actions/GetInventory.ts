export default async function getInventory() {
    const baseUrl = process.env.URL;
    try {
      const res = await fetch(`${baseUrl}/api/inventory`, { next: { revalidate: 0 } } );
    
      if (!res.ok) {
        console.error(res);
        throw new Error(`ERROR: could not retrieve inventory`);
      }
    
      return res.json();
    } catch(error) {
      console.error(error)
    }
  }