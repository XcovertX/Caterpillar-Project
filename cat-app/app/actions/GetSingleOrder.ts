export default async function getSingleOrderByOrderId(orderId: bigint) {
    const baseUrl = process.env.URL;
    try{
      const res = await fetch(`${baseUrl}/api/order/${orderId}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the order: ", error)
      return null;
    }
  }

  export async function getSingleOrderByCutomerId(customerID: bigint) { 
    const baseUrl = process.env.URL;
    try{
      const res = await fetch(`${baseUrl}/api/order/${{ customerID }}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the order: ", error)
      return null;
    }
  }