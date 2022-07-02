import { Card, Col} from 'react-bootstrap';

export default function MovieCard({movie}) {
    return (
        <Col className="cardPelicula">
            <Card bg={"dark"} className="mb-3">
                <Card.Img variant="top" src={movie.image}  className="cardPelicula_img"/>
                <Card.Body>
                    <Card.Subtitle className="mb-2 cardPelicula_upperText">{`${movie.disponible}`}</Card.Subtitle>
                    <Card.Title className="cardPelicula_title">{`${movie.title}`}</Card.Title>
                    <Card.Subtitle className="mt-2 text-muted cardPelicula_subtitle">{`${movie.description}`}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Col>
    )
}