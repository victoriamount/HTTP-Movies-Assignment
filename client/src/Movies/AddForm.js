import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Movie from './Movie'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddForm = (props) => {
    const [formValues, setFormValues] = useState(initialMovie)
    
    const { movieList, setMovieList } = props
    const { push } = useHistory()
    const { id } = useParams()

    const handleChange = e => {
        e.persist()

        let value = e.target.value
        if (e.target.name === 'stars') {
            value = value.split(',')
            // value = value.map(actor => (actor.trim()))
        }
        // console.log(value)
        setFormValues({
            ...formValues, 
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(formValues)
        axios
            .post(`http://localhost:5000/api/movies/`, formValues)
            .then(res => {
                console.log(res.data)
                setMovieList([
                    ...movieList, 
                    res.data
                ])
                setFormValues(initialMovie)
                push(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={formValues.title}
                />

                <input
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={formValues.director}
                />

                <input
                type="number"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore (1-100)"
                value={formValues.metascore}
                />

                <input
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Stars"
                value={formValues.stars}
                />

                <button>Submit</button>
            </form>            
        </div>
    )
}

export default AddForm
