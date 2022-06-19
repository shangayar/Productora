import React, { useEffect, useState } from 'react'

import '../styles/homepage.css';
import { Card, Container, Col, Row} from 'react-bootstrap'

function Homepage(){

    const response = {
        "searchType": "Movie",
        "expression": "inception 2010",
        "results": [
            {
                "id": "tt1375666",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6800_AL_.jpg",
                "title": "Inception",
                "description": "(2010)",
                "disponible": "Disponible en Disney+"
            },
            {
                "id": "tt1790736",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_Ratio0.6800_AL_.jpg",
                "title": "Inception: Motion Comics",
                "description": "(2010 Video)",
                "disponible": "Disponible en Netflix"
            },
            {
                "id": "tt5295990",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_Ratio0.6800_AL_.jpg",
                "title": "Inception: Jump Right Into the Action",
                "description": "(2010 Video)",
                "disponible": "Disponible en HBO+"
            },
            {
                "id": "tt1686778",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/nopicture.jpg",
                "title": "Inception: 4Movie Premiere Special",
                "description": "(2010 TV Movie)",
                "disponible": "Disponible en HBO+"
            },
            {
                "id": "tt12960252",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/nopicture.jpg",
                "title": "Inception Premiere",
                "description": "(2010)",
                "disponible": "Disponible en Netflix"
            },
            {
                "id": "tt1375666",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6800_AL_.jpg",
                "disponible": "Disponible en HBO+",
                "title": "Inception",
                "description": "(2010)"
            },
            {
                "id": "tt1790736",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_Ratio0.6800_AL_.jpg",
                "title": "Inception: Motion Comics",
                "disponible": "Disponible en Disney+",
                "description": "(2010 Video)"
            },
            {
                "id": "tt5295990",
                "resultType": "Title",
                "image": "https://imdb-api.com/images/original/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_Ratio0.6800_AL_.jpg",
                "disponible": "Disponible en HBO+",
                "title": "Inception: Jump Right Into the Action",
                "description": "(2010 Video)"
            },
        ],
        "errorMessage": ""
    }
    
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const filteredResponse = response.results.filter((result) => !result.image.includes("https://imdb-api.com/images/original/nopicture.jpg"))
        setMovieList(filteredResponse)
    },[])

    const skillsList = [
        {title: 'Budgeting',
        porcentaje: '80%',
        class: 'x-80'},
        {title: 'Creatividad',
        porcentaje: '60%',
        class: 'x-60'},
        {title: 'Edición',
        porcentaje: '80%',
        class: 'x-80'},
        {title: 'Gionaje',
        porcentaje: '70%',
        class: 'x-70'},
        {title: 'Organización',
        porcentaje: '90%',
        class: 'x-90'}
    ];
    return(
        <div className='margin_wholePage' id='homepage'>
            <section id='banner'>
                <div></div>
                <div>
                    <p className='encabezadoSize blanco'>Productora+</p>
                    <p className='encabezadoSize blanco'>Productores de cine</p>
                </div>
            </section>
            <section className='ctn_page'>
                <article>
                    <div>
                        <img src="../src/img/logoProductora.svg" alt="logo de la productora" />
                    </div>
                    <div>
                        <p className='subtitulo'>Nosotros</p>
                        <p>Especialistas en producciones audiovisuales y storytelling. Trabajamos con los mejores productores para traerte cine de calidad. Traemos prestigio al cine Argentino.</p>
                        <p>Leé más sobre nosotros <Link to="/Nosotros">acá</Link></p>
                    </div>
                </article>
                <article>
                    <div>
                        <p className='subtitulo'>Experiencia</p>
                    </div>
                    <div id='containerCards'>
                        {movieList.map((movie) => (
                            <Col className="cardPelicula">
                                <Card bg={"dark"} key={movie.id} className="mb-3">
                                    <Card.Img variant="top" src={movie.image}  className="cardPelicula_img"/>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 cardPelicula_upperText">{`${movie.disponible}`}</Card.Subtitle>
                                        <Card.Title className="cardPelicula_title">{`${movie.title}`}</Card.Title>
                                        <Card.Subtitle className="mt-2 text-muted cardPelicula_subtitle">{`${movie.description}`}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) }
                    </div>
                </article>
                <article id="ctn_skills">
                    <div>
                        <p className='subtitulo'>Skills</p>
                    </div>
                    <div>
                        <Row className='spaceBetween'>
                            {skillsList.map((skills) => (
                                <Col className="centerHorizontal chart">
                                    <div className={skills.class}>
                                        <p>{skills.porcentaje}</p>
                                    </div>
                                    <p className='skills_text'>{skills.title}</p>
                                </Col>
                            )) }
                        </Row>
                    </div>
                </article>
                <article>
                    <div>
                        <p className='subtitulo'>Confían en nosotros</p>
                    </div>
                    <div id='ctn_confian'> 
                        <Row className='spaceBetween'>
                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="./src/img/paramount.svg"></img>
                                </div>
                            </Col>
                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="./src/img/sony.svg"></img>
                                </div>
                            </Col>

                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="./src/img/warner.svg"></img>
                                </div>
                            </Col>

                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="./src/img/sony.svg"></img>
                                </div>
                            </Col>

                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="./src/img/paramount.svg"></img>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </article>
            </section>
        </div>
    )
}
export default Homepage;