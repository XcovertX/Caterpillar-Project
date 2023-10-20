export default async function getSingleProductByProductId(productId: bigint) {
    const baseUrl = process.env.URL;
    try{
      const res = await fetch(`${baseUrl}/api/inventory/${productId}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the product.", error)
      return null;
    }
  } 