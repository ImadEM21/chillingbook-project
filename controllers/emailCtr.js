const addEmail = email => {
    var request = require("request");

    var options = { method: 'POST',
    url: 'https://us17.api.mailchimp.com/3.0/lists/aa53ea0592/members',
    headers: 
    { 'postman-token': '9b0e6c73-912b-49f9-1e4a-979efcf1a8af',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        authorization: 'Basic YW55c3RyaW5nOmFhYWY0MDYyNTc5OTk1ZGExN2QxNTEwODE4MDE3ZmIwLXVzMTc=' },
    body: { email_address: email, status: 'subscribed' },
    json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });

};


exports.getEmail = (req, res) => {
    addEmail(req.body.email);
    res.status(201).json({message: "Email ajouté avec succès"});
};

