
export default async function getOrders() {
    const baseUrl = process.env.URL;
    
    try {
      const res = await fetch(`${baseUrl}/api/order`, { next: { revalidate: 0 } } );
    
      if (!res.ok) {
        console.error(res);
        throw new Error(`ERROR: could not retrieve orders`);
      }
    
      return res.json();
    } catch(error) {
      console.error(error)
    }
  }

  export async function getOrdersByCutomerId(customerID: bigint) {
    const baseUrl = process.env.URL;
    try{

      const res = await fetch(`${baseUrl}/api/order/ordersBy/${customerID}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the order: ", error)
      return null;
    }
  }