import { Navigate, useNavigate} from "react-router-dom";
import useToken from "src/hooks/useToken";
import { useState, useEffect, useContext } from "react";
import { APIURLContext } from 'src/contexts/APIURLContext';
import axios from "axios";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/pages/ProfilePage/ProfilePage.css'

export default function ProfilePage() {
    const {token, setToken} = useToken();
    const apiURL = useContext(APIURLContext);
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(apiURL + '/users/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const name = response.data.email.split('.')[0];
                response.data.name = name.charAt(0).toUpperCase() + name.slice(1);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        async function fetchDonations() {
            try {
                const response = await axios.get(apiURL + '/users/donations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDonations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching donations:', error);
                setLoading(false);
            }
        }

        fetchUserData();
        fetchDonations();
    }, [token, apiURL]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    };

    if (!token) {
        return <Navigate replace to='/login' />
    }

    return(
        <div className="container-fluid bg-secondary">
            <div className="row">
                <div className="col">
                    <h1 className="profile-heading">Welcome, {user ? user.name : ''}</h1>
                </div>
                <div className="col text-end mt-3">
                    <button className="btn btn-danger logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className="profile-subheading">Email: {user ? user.email : ''}</h1>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
            <div className="row mt-4">
                <div className="col">
                    <h2>Your Donations</h2>
                    <table className="table table-primary">
                        <thead className='table-secondary'>
                            <tr>
                                <th scope="col">Campaign</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation) => (
                                <tr key={donation._id}>
                                    <td><Link to={`/campaigns/${donation.campaign_id._id}`}>{donation.campaign_id.name}</Link></td>
                                    <td>{donation.amount}</td>
                                    <td>{new Date(donation.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    )
}