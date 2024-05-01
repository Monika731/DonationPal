import 'src/pages/home/Home.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { APIURLContext } from 'src/contexts/APIURLContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from 'src/campaign.jpeg';

function Home() {
        // Set up initial state of state variables
        const [campaigns, setCampaigns] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const apiURL = useContext(APIURLContext);
    
        useEffect(() => {
            // Define a function that loads tasks from the API
            const loadTasks = async () => {
                try {
                    const response = await axios.get(apiURL + '/campaigns');
                    const campaignsData = response.data;
                    const updatedCampaigns = await Promise.all(campaignsData.map(async (campaign) => {
                    const response = await axios.get(`${apiURL}/campaigns/${campaign._id}`);
                    const { campaign: campaignDetails, donations } = response.data;
                    const totalDonations = donations.reduce((total, donation) => total + donation.amount, 0);
                    const progress = (totalDonations / campaignDetails.goal) * 100;
                    return { ...campaignDetails, totalDonations, progress };
                    }));
                    setCampaigns(updatedCampaigns);
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
        }, [apiURL]);

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
                                    <p className="card-text">Funded: ${campaign.totalDonations}</p>
                                    <div className="progress-container">
                                        <div className="progress home-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${Math.min(campaign.progress, 100)}%` }} aria-valuenow={campaign.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span className="percentage">{Math.min(Math.round(campaign.progress), 100)}%</span>
                                    </div>
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