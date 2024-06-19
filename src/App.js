import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [users, setUser] = useState([])
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData(nextPage)
  }, [])

  const fetchData = async (pageNumberToken = 1) => {
    setError(null)
    setIsLoading(true)
    try{
      const response =  await axios.get(`https://picsum.photos/v2/list?page=${pageNumberToken}&limit=10`)
      const data = await response.data
      console.log(data);
      setUser((prevUser) => [...prevUser, ...data])
      setNextPage((prevPage) => prevPage + 1)

    }catch(err){
      setError(err)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={users.length}
        next={() => fetchData(nextPage)}
        hasMore={true}
        loader={<p>Loading . . . </p>}
        endMessage={<p>No more data to laod.</p>}>
        {error && <h3>{error.message}</h3>}
        <h1>Infinite Scroll implementation</h1>
        <div className='gallery'>
          {users.map((user) => {
            return (
              <img
              key={user.id}
              src={user.download_url}
              alt={user.author}
              height={400}
              width={400}
              />
            )
          })}

        </div>
        {isLoading && <h5>Loading . . .</h5>}

      </InfiniteScroll>
    </div>
  );
}

export default App;
