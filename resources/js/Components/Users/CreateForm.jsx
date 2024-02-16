import { Link } from 'react-router-dom';

export default function CreateForm()
{
    return (
        <Link to='/admin/users/create'>
            <button className="btn btn-primary top-btn">
                Create
            </button>
        </Link>
    )
}
