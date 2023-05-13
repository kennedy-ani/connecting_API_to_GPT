// const { GoogleAuth } = require('google-auth-library');
// import { google  } from 'googleapis';
const process = window.process;
const env = process.env.NODE_ENV;

if(env){
    const {google} = require('googleapis');
    const key = require('./api/trkf-385922-ac9d63310aaa.json')
    const scope = ['https://www.googleapis.com/auth/spreadsheets']
    
    
    // const getButton = document.getElementById('getButton');
    const updateForm = document.querySelector('#updateForm');
    const sheets = google.sheets({version: 'v4', auth});
    const range = document.querySelector('#range');//range we are getting data from
    const spreadsheetId = document.querySelector('#sheetId');
    
    const auth = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        scope
    )
    
    auth.authorize((err, token)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(`Access token: ${token.access_token}`)
    })
    
    
    
    // // Read the data from the sheet
    
    // getButton.addEventListener('click', ()=>{
    //     sheets.spreadsheets.values.get({
    //         auth: auth,
    //         spreadsheetId: spreadsheetId,
    //         range: range,
    //     }, (err, res)=>{
    //         if(err) return console.log(`The API returned an error: `)
    //         const rows = res.data.values;
    //         console.log(`Data: ${rows}`)
    //     })
    // })
    
    // update data on the sheet
    const valueInput = document.querySelector('#valueInput');
    const values = valueInput.value;
    
    
    updateForm.addEventListener('submit', async(e)=>{
        e.preventDefault();
    
    
    
        sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'RAW', //to parse the values as values entered by users
            resource: {
                range,
                values: [[values]],
            },
        
        },(err, res)=>{
            if(err){
                console.error(err);
                return;
            }console.log(`${res.data.updatedCells} cells updated!`);
        })
    })
}
