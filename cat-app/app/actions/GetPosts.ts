export default async function getPosts() {
    const baseUrl = process.env.URL;
    const res = await fetch(`${baseUrl}/api/post`, { next: { revalidate: 0 } } );
  
    if (!res.ok) {
      console.error(res);
      throw new Error(`Could not get post`);
    }
  
    return res.json();
  }