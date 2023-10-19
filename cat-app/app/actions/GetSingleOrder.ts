
export default async function getSingleOrder(orderID: bigint) {
    const baseUrl = process.env.URL;
    try{
      const res = await fetch(`${baseUrl}/api/order/${{ orderID: orderID }}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the order: ", error)
      return null;
    }
  }