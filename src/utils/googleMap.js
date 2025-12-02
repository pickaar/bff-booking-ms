// import { Client } from '@googlemaps/google-maps-services-js';
// import * as Maps from '@googlemaps/google-maps-services-js';
// const { Client } = require('@googlemaps/google-maps-services-js');
// Make sure your API key has the "Routes API" enabled in the Google Cloud Console.
const API_KEY = process.env.GOOGLE_CLIENT_ID;
// const client = new Client({});
// console.log(API_KEY + 'Available Client Methods:', Object.keys(client));
/**
 * Helper function to convert seconds to a readable H:MM format.
 * @param {number} totalSeconds - Duration in seconds.
 * @returns {string} - Duration in "X hour(s) Y min(s)" format.
 */
function formatDuration(totalSeconds) {
    if (totalSeconds < 60) return `${totalSeconds} seconds`;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);

    return parts.join(' ');
}

export async function getRouteInformationWithRoutesAPI(originAddress, destinationAddress) {
    try {
        console.log(originAddress, '------=====-', typeof originAddress);
        console.log(destinationAddress, '---------------', typeof destinationAddress);
        // const response = await client.routes({
        //     params: {
        //         // origin: { address: originAddress },
        //         // destination: { address: destinationAddress },
        //         origin: { latLng: { latitude: originAddress[0], longitude: originAddress[1] } }, // Approximate Perumbakkam
        //         destination: { latLng: { latitude: destinationAddress[0], longitude: destinationAddress[1] } }, // Katpadi Railway Station
        //         travelMode: "DRIVE",
        //         // 1. Request toll information computation
        //         extraComputations: ["TOLLS"],
        //         // 2. Specify the exact fields we need (mandatory for Routes API)
        //         fields: [
        //             "routes.duration", "routes.travelAdvisory.tollInfo"
        //         ],
        //         key: API_KEY,
        //     },
        // });
        // const response = await client.routes({
        //     params: {
        //         origin: { latLng: { latitude: 13.011023, longitude: 77.554715 } },
        //         destination: { latLng: { latitude: 12.840641, longitude: 80.153428 } },
        //         travelMode: "DRIVE",
        //         // --- REMOVE extraComputations: ["TOLLS"] ---

        //         // --- UPDATE Field Mask ---
        //         fields: [
        //             "routes.distanceMeters",
        //             "routes.duration"
        //         ],
        //         key: API_KEY,
        //     },
        // });
        // const route = response.data.routes[0];
        // if (!route) {
        //     console.log('No route found.');
        //     return;
        // }

        // // --- Data Extraction and Formatting ---

        // // Distance: Convert meters to kilometers and round
        // const distanceKM = (route.distanceMeters / 1000).toFixed(1) + ' km';

        // // Duration: Convert duration string (e.g., "16500s") to seconds, then format
        // const durationSeconds = parseInt(route.duration.replace('s', ''));
        // const durationFormatted = formatDuration(durationSeconds);

        // // Toll Status and Price
        // let tollAvailable = false;
        // let tollPrice = 'N/A';
        // let currency = '';

        // const tollInfo = route.travelAdvisory?.tollInfo;

        // if (tollInfo && tollInfo.estimatedPrice && tollInfo.estimatedPrice.length > 0) {
        //     const priceData = tollInfo.estimatedPrice[0];

        //     tollAvailable = true;
        //     tollPrice = priceData.units.toFixed(2); // Format price to two decimal places
        //     currency = priceData.currencyCode;
        // }

        // // --- Console Output ---
        // console.log("\n--- Routes API Result ---");
        // console.log(`Origin: ${originAddress}`);
        // console.log(`Destination: ${destinationAddress}`);
        // console.log(`\n1. Distance: **${distanceKM}**`);
        // console.log(`2. Duration: **${durationFormatted}**`);
        // console.log(`3. Toll Available: **${tollAvailable}**`);
        // console.log(`4. Estimated Toll Price: **${tollAvailable ? `${tollPrice} ${currency}` : 'None'}**`);
        // console.log(`\n*Note: The toll price is an estimate and may vary based on payment method.*`);


        return {
            from: originAddress,
            to: destinationAddress,
            tollAvailable: true,
            distance: { text: "10.5 km", value: 10500 }, //distanceKM,
            duration: { text: "25 mins", value: 1500 }, //durationFormatted,
            tollPrice: 150.00, //parseFloat(tollPrice),
            currency: "INR" //`${tollPrice} ${currency}`
        }

    } catch (error) {
        // console.error('\nError fetching routes:', error.response?.data?.error_message || error.message);
        console.error('Check if the "Routes API" is enabled in your Google Cloud Console.');
    }
}
