import React, { useState } from 'react';
import './App.scss';
import { useQuery } from 'react-query';
import axios from 'axios';
import NasaCard from './NasaCard';

function App() {
  const currentFetchedPage: number = 1
  const [currentPage, setCurrentPage] = useState<number>(1);


// fetch Nasa data
  const fetchData = async (currentFetchedPage: number) => {
    const { data } = await axios.get(`http://images-api.nasa.gov/search?page=${currentFetchedPage}&q=apollo+11&description=moon+landing&media_type=image`)
    return data
  }


  //const { status, data, error, isPreviousData } = useQuery(
  const { status, data, error } = useQuery(
    ['results', currentFetchedPage],
    () => fetchData(currentFetchedPage),
  )

  //number of posts displayed per page
  const postsPerPage: number = 20;
// console.log(data.collection.items[0].nasa_id)
// console.log(data?.collection.items[0].data[0].nasa_id)

  //get number of pages
  //number of entire post / number of posts per page
  const totalPost = data?.collection.items.length
  const pageCount: number = totalPost/postsPerPage;


  //get current posts
  const indexofLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexofLastPost - postsPerPage;
  const currentPosts = data?.collection.items.slice(indexofFirstPost, indexofLastPost);


  if (error) return <p>Error...</p>

  return (
    <div className="App">
      {status === 'loading' ? 'loading...' :
        <div className='nasacard-container'>
          {currentPosts.map((nasaData: any,) => {
            return (
              <NasaCard
                key={nasaData.data[0].nasa_id}
                data={nasaData.data}
                links={nasaData.links}

              />
            )
          })}
        </div>}

      {status === 'loading' ? '' : (
        <div className='pagination'>
          <div className='pages'>
            <button className={currentPage === 1 ? 'disabled' : ''}
              onClick={() => setCurrentPage(old => Math.max(old - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p> {currentPage}/{pageCount}</p>
            <button className={currentPage === pageCount ? 'disabled' : ''}
              onClick={() => {
                setCurrentPage(old => (pageCount >= 1 ? old + 1 : old))
              }}
              disabled={currentPage === pageCount}
            >
              Next
            </button>
          </div>


        </div>
      )}
    </div>
  );
}

export default App;
