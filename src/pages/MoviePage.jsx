import React, { useEffect, useState } from 'react'
import { Card, Container, Col, Row} from 'react-bootstrap'
import { useLocation } from "react-router-dom";

const base_url = `https://imdb-api.com/en/API/SearchTitle/${import.meta.env.VITE_MOVIES_API_KEY}`

export default function MoviePage() {
    const location = useLocation();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const { movieData } = location.state
        console.log("movieData =>", movieData)
        setMovie(movieData)
    },[])

  return (
    <Container className="mb-3 mt-5">
        {
            movie && (
                <Row>
                    <Col>
                        <Card bg={"dark"} key={movie.id} className="mb-3">
                            <Card.Img variant="top" src={movie.image} />
                        </Card>
                    </Col>
                    <Col>
                        <Card bg={"dark"} key={movie.id} className="mb-3">
                            <Card.Body>
                                <Card.Title>{`${movie.title}`}</Card.Title>
                                {Object.entries(movie).map((object) => {
                                    const [propierty, value] = object
                                    if (propierty == "image" ) {
                                        return
                                    }
                                    return (
                                        <>
                                            <Card.Subtitle className="mt-2 text-muted">{propierty}</Card.Subtitle>
                                            <Card.Text>{value}</Card.Text>
                                        </>
                                    )
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        }
    </Container>
  )
}