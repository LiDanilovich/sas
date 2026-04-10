
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;

}

/* fetch the user data from the API and return the user's name 
   * @param userId - The ID of the user whose name we want to fetch
    * @returns A promise that resolves to the name of the specified user
*/  
async function fetchUserName(userId: number): Promise<User> {
 
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
        throw new Error(`User with ID ${userId} not found (HTTP ${response.status})`);
    }

    const user: User = await response.json();
    return user;
}


/* fetch all Posts from the API and filter by userId 
 * @param userId - The ID of the user whose posts we want to fetch
 * @returns A promise that resolves to an array of Post objects for the specified user
*/  
async function fetchPostsByUser(userId: number): Promise<void> {
 
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch posts. (HTTP ${response.status})`);
  }

  const posts: Post[] = await response.json();
  /* 
  console.log(`Total posts fetched: ${posts.length}`);
  console.log('First post:');
  console.log(posts[0]);
  */

  const userPosts = posts.filter(post => post.userId === userId);
  // Fetch the user's name for better output
  const user: User = await fetchUserName(userId);

  console.log(`Posts from user ${user.name} (ID: ${userId}): ${userPosts.length}`);
  userPosts.forEach(post => console.log(`- ${post.title}`));

  
}

fetchPostsByUser(999).catch(console.error);