import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState({ campaign: {}, donations: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignResponse = await axios.get(`http://localhost:8080/api/v1/campaigns/${id}`);
        setCampaign(campaignResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const totalDonations = campaign.donations.reduce((total, donation) => total + donation.amount, 0);

  return (
    <div className="container-fluid bg-secondary">
      <div className="row">
        <div className="col-md-6">
          <h1>{campaign.campaign.name}</h1>
          <p>{campaign.campaign.description}</p>
          <p><span role="img" aria-label="raised">💰</span><span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>${totalDonations} </span>raised of ${campaign.campaign.goal}</p>
          <p><span role="img" aria-label="donations">🎁</span>{campaign.donations.length} donations</p>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="progress mt-3 w-75">
            <div className="progress-bar" role="progressbar" style={{ width: `${(totalDonations / campaign.campaign.goal) * 100}%` }} aria-valuenow={(totalDonations / campaign.campaign.goal) * 100} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary m-2">Donate Now</button> 
            <button className="btn btn-info">Share</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h3>Donations</h3>
          <table className="table table-primary">
            <thead className='table-secondary'>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {campaign.donations.map((donation, index) => (
                <tr key={index}>
                  <td>${donation.amount}</td>
                  <td>{donation.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;