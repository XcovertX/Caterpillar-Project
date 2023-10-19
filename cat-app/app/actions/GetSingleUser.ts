export default async function getSingleUser(userId: bigint) {
    const baseUrl = process.env.URL;
    try{
      const res = await fetch(`${baseUrl}/api/user/${userId}`, { next: { revalidate: 0 } } );
      if (!res.ok) {
        throw new Error(`Could not get user`);
      }
      return res.json();
    } catch(error) {
      console.error("ERROR: Could not retrieve the user.", error)
      return null;
    }

  }