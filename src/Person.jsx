import React from 'react';
import { 
    useParams, 
    useHistory 
} from 'react-router-dom';

function Person() {
    const {id} = useParams();
    let history = useHistory();
    const handleBack = (e) => {
        // console.log(e);
        // e.stopPropagation();
        history.goBack();
    }
    return (
        <div>
            <button onClick={(e) => {handleBack();}}>Back</button>
            ID: {id}
        </div>
    )
}

export default Person
