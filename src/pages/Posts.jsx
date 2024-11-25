import { useState, useEffect } from 'react'




export default function Posts() {
    const [postsData, setPostsData] = useState({})


    function fetchData(url = "http://localhost:3001/posts") {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setPostsData(data)

            })
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <>
            <h1>
                Posts page
            </h1>
            <section className='posts'>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                        {
                            postsData.data ?
                                postsData.data.map((post, index) => (
                                    <div className="col" key={post.id || index}>
                                        <div className="card">
                                            <h3>
                                                {post.title}
                                            </h3>
                                            <img src={'http://localhost:3001/' + post.image} alt={post.title} />
                                        </div>
                                        {post.content}
                                    </div>
                                )) :
                                <p>No data found</p>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
