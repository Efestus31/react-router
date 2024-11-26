import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import FormField from './pages/FormField'
import MainMenu from './components/MainMenu'
import DefaultLayout from './pages/DefaultLayout'



function App() {

  const [formData, setFormData] = useState({
    titolo: '',
    immagine: '',
    contenuto: '',
    categoria: '',
    tags: [],
    pubblicato: false
  })
  const [newPost, setNewPost] = useState({})

  //const [postsData, setPostsData
  const [postsData, setPostsData] = useState({})

  const [articoli, setArticoli] = useState([]);
  //handle title imput
  function handleTitle(e) {
    setFormData({ ...formData, titolo: e.target.value })
  }
  //handle image
  function handleImage(e) {
    setFormData({ ...formData, immagine: e.target.files[0] });
  }
  //handle content imput
  function handleContent(e) {
    setFormData({ ...formData, contenuto: e.target.value })
  }
  //handle form imput
  function handleCategory(e) {
    setFormData({ ...formData, categoria: e.target.value })
  }
  //handle tags
  function handleTags(e) {
    const { value, checked } = e.target
    setFormData((prevData) => {
      const newTags = checked
        ? [...prevData.tags, value]
        : prevData.tags.filter((tag) => tag !== value)
      return { ...prevData, tags: newTags }
    })
  }
  //handle publish
  function handlePublish(e) {
    setFormData({ ...formData, pubblicato: e.target.checked })
  }
  //handle form submit
  function handleSubmit(e) {
    e.preventDefault()
    // console.log(formData);
    //setArticoli([...articoli, formData]);
    //reset of title after submit
    setFormData({ title: '', image: '', content: '', categoria: '', tags: [], pubblicato: false })

    //make a post request to the api serve  and pass over the newItem object to the SetArticoli state setter
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then(response => {
        setArticoli([...articoli, response]);
      })

  }


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
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path='/form' element={<FormField />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
