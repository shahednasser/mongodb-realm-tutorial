import { Badge } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { isAnon } from '../utils';

function RestaurantCard ({restaurant, user}) {
    //get average of grades
    let sum = 0;
    restaurant.grades.forEach(element => {
        sum += element.score
    });
    const avg = Math.round(sum / (restaurant.grades.length))
    return (
        <Card className="m-3">
            <Card.Body>
                <Card.Title>{restaurant.name} <Badge variant="warning">{avg}</Badge></Card.Title>
                {!isAnon(user) && <Link to={`/review/${restaurant._id}`} className="card-link">Add Review</Link>}
            </Card.Body>
        </Card>
    )
}

export default RestaurantCard