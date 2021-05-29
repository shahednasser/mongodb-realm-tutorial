import { Formik } from 'formik'
import { useState } from 'react'
import { BSON } from 'realm-web'
import Loading from '../components/Loading'
import * as yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { isAnon } from '../utils'

const reviewSchema = yup.object().shape({
    review: yup.number().required()
})

function AddReview({mongoContext: {client, app, user}}) {
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const history = useHistory()

    if (isAnon(user)) {
        history.push('/')
    }

    function submitHandler (values) {
        setLoading(true)
        const rests = client.db('sample_restaurants').collection('restaurants')
        rests.updateOne({"_id": BSON.ObjectID(id)}, {"$push": {"grades": {
            date: new Date(),
            score: values.review,
            user_id: BSON.ObjectID(app.currentUser.id)
        }}}).then (() => history.push('/'))
            .catch ((err) => {
    			alert(err)
    			setLoading(false)
			})
    }

    return (
        <Formik
            initialValues={{
                review: 0
            }}

            validationSchema={reviewSchema}
            onSubmit={submitHandler}>
            
            {({errors, touched, handleSubmit, values, handleChange}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {loading && <Loading />}
                    {!loading && (<div>
                        <h1>Submit Review</h1>
                        <Form.Row>
                            <Form.Label>Review Score</Form.Label>
                            <Form.Control type="number" name="review" value={values.review} onChange={handleChange} 
                            isValid={touched.review && !errors.review} />
                            <Form.Control.Feedback>{errors.review}</Form.Control.Feedback>
                        </Form.Row>
                        <div className="text-center mt-2">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </div>)}
                </Form>
            )}

        </Formik>
    )
}

export default AddReview