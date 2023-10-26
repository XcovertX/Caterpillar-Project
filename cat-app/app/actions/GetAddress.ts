export async function getAddressByAddressId(addressId: bigint) {
    const baseUrl = process.env.URL;
    try{

      const res = await fetch(`${baseUrl}/api/address/${addressId}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the address: ", error)
      return null; 
    }
  }