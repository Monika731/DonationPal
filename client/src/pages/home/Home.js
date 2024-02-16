import 'src/pages/home/Home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from 'src/campaign.jpeg';

function Home() {
        // Set up initial state of state variables
        const [campaigns, setCampaigns] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
    
        useEffect(() => {
            // Define a function that loads tasks from the API
            const loadTasks = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/campaigns`);
                    console.log(response.data);
                    setCampaigns( (campaigns) => [...response.data]);
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    setError(err.message);
                    console.error(err);
                }
            };
    
            // Call the function we defined
            setLoading(true);
            loadTasks();
        }, []);
    return(
        <div className='container-fluid bg-secondary'>
            <h1>List of Campaigns</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="row">
                    {campaigns.map(campaign => (
                        <div key={campaign._id} className="col-md-4 mb-4">     
                            <div className="card h-100" style={{width: '25rem'}}>
                                <img src={logo} className="card-img-top" alt={campaign.name} style={{ maxHeight: '230px', maxWidth: '400px' }}/>
                                <div className="card-body d-flex flex-column">
                                    <Link to={`/campaigns/${campaign._id}`} className="card-link">
                                        <h5 className="card-title">{campaign.name}</h5>
                                    </Link>
                                    <p className="card-text">{campaign.description}</p>
                                    <p className="card-text">Goal: {campaign.goal}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;