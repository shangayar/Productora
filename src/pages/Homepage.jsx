import React  from 'react';
import { Link } from "react-router-dom";
import '../styles/homepage.css';
import { Col, Row} from 'react-bootstrap';
import someMovies from '../data/someMovies.json';
import MovieCard from '../components/MovieCard';

function Homepage(){
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
                        <img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/logoProductora.svg" alt="logo de la productora" />
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
                        {someMovies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id + Math.random()}></MovieCard>
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
                                <Col className="centerHorizontal chart" key={Math.floor(Math.random() * 123)}>
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
                                    <img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/paramount.svg"></img>
                                </div>
                            </Col>
                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/sony.svg"></img>
                                </div>
                            </Col>

                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/warner.svg"></img>
                                </div>
                            </Col>

                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/sony.svg"></img>
                                </div>
                            </Col>

                            <Col className="centerHorizontal">
                                <div className="confian">
                                    <img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/paramount.svg"></img>
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