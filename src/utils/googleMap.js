import { Client } from "@googlemaps/google-maps-services-js";

const API_KEY = process.env.GOOGLE_CLIENT_ID; 

const client = new Client({});

export async function getRouteInformation(originAddress, destinationAddress) {
    try {
        console.log(`\nFinding route from ${originAddress} to ${destinationAddress}...`);
console.log("API KEY:", API_KEY);
        // The Directions API accepts address strings directly
        const response = await client.directions({
            params: {
                origin: originAddress,
                destination: destinationAddress,
                mode: "driving",
                units: "metric", // Use metric units (kilometers/meters)
                // This parameter hints to the API to avoid toll roads, 
                // but the response structure also includes toll info if present.
                // For accurate TOLL PRICE, you should use the Routes API (computeRoutes endpoint).
                key: API_KEY,
            },
        });

        const route = response.data.routes[0];
        if (!route) {
            return;
        }

        const leg = route.legs[0]; // Get the main journey leg

        // --- 2. Distance between from and two ---
        const distance = leg.distance.text;

        // --- 3. Duration to reach the destination ---
        const duration = leg.duration.text;
        
        // --- 1. Toll available for this route ---
        let tollStatus;
        if (route.summary.includes('Toll')) {
            tollStatus = true;
        } else {
            tollStatus = false;
        }
        
        // --- 4. Toll Price (Note on Accuracy) ---
        // For the precise toll price, the dedicated Routes API (computeRoutes) is the official method.
        // The basic Directions API is better for determining *if* tolls exist.
        const tollPriceNote = 'For accurate toll price, enable the Routes API and use the computeRoutes endpoint.';
        
        console.log("\n--- Route Details ---");
        console.log(`Origin: ${originAddress}`);
        console.log(`Destination: ${destinationAddress}`);
        console.log(`\n1. Toll Available: **${tollStatus}**`);
        console.log(`2. Distance: **${distance}**`);
        console.log(`3. Duration: **${duration}**`);
        console.log(`\n**Note on Toll Price:** ${tollPriceNote}`);

        return{
            tollAvailable: tollStatus,
            distance: distance,
            duration: duration,
            tollPriceNote: tollPriceNote
        }

    } catch (error) {
        console.error('\nError fetching directions:', error.response?.data?.error_message || error.message);
    }
}