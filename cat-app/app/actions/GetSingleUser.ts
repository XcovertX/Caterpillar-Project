export default async function getSingleUser(userId: string) {
    const baseUrl = process.env.URL;
    const res = await fetch(`${baseUrl}/api/user/${userId}`, { next: { revalidate: 0 } } );
  
    if (!res.ok) {
      throw new Error(`Could not get users`);
    }
  
    return res.json();
  }