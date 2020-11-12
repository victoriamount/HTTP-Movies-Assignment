import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Movie from './Movie'

const initialMovie = {
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}

const UpdateForm = (props) => {
    const [formValues, setFormValues] = useState(initialMovie)
    
    const { movieList, setMovieList } = props
    const { push } = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setFormValues(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    const handleChange = e => {
        e.persist()
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, formValues)
            .then(res => {
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
            <h2>Update Movie</h2>
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

                <button>Update</button>
            </form>            
        </div>
    )
}

export default UpdateForm
