const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('models/Campaign');
require('models/Donation');
const Campaign = mongoose.model('campaigns');
const Donation = mongoose.model('donations');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Helper function to get Prod/Dev Client/API URL
const getURL = (app) => {
    if(process.env.NODE_ENV === 'production') {
        if(app === 'client') {
            return process.env.PROD_CLIENT_URL;
        } else {
            return process.env.PROD_API_URL;
        }
    } else {
        if(app === 'client') {
            return process.env.DEV_CLIENT_URL;
        } else {
            return process.env.DEV_API_URL;
        }
    }
}

//Root route
router.get('/', (req, res) => {
    res.send('Root API route for donations');
});

router.post('/create_checkout', async (req, res) => {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.campaign_name
                    },
                    unit_amount: req.body.donation_amount
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `${getURL('api')}/donations/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}`,
        cancel_url: `${getURL('client')}`,
        metadata: {
            camapaign_id: req.body.campaign_id
        }
    });

    console.log(session);
    res.redirect(303, session.url);
});

router.get('/donation_success', async (req, res) => {
    //view the entire querystring
    console.log(req.query);
    //Retrieve the checkout session from the stripe API
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    //view the entire session object returned by stripe
    console.log(session);
    //Retrieve the campaign_id (metadata or querystring)
    console.log(session.metadata.campaign_id);
    console.log(req.query.campaign_id);
    //add a donation record to the database
    const donation_amount = session.amount_total/100;
    const campaign_id = req.query.campaign_id;
    console.log(campaign_id);
    const newDonation = new Donation({
        campaign_id: campaign_id,
        amount: donation_amount,
        message: "Payment through stripe",
        payment_id: session.payment_intent
    });
    await newDonation.save();
    //construct a URL to the frontend to deliver the user
    const clientURL = `${getURL('client')}/donation_success?campaign_id=${req.query.campaign_id}&donation_amount=${donation_amount}`;
    //redirect the user
    res.redirect(303, clientURL);
})

module.exports = router;