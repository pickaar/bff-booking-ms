export function convertToMongoDate(pickUpDate, pickUpTime) {
    if (!pickUpDate || !pickUpTime) {
        console.error("Date or time string is missing.");
        return null;
    }

    try {
        // 1. Split the DD/MM/YYYY date string
        const [day, month, year] = pickUpDate.split('/');

        // 2. Format it into the unambiguous 'YYYY-MM-DDTHH:MM:SS' ISO format.
        // We use UTC format to avoid timezone issues when storing in MongoDB.
        // IMPORTANT: The Date object months are 0-indexed (Jan=0, Dec=11), 
        // but the constructor can handle the full date string correctly.
        
        // This creates a date string like '2025-11-30T09:43:43'
        const combinedDateTimeString = `${year}-${month}-${day}T${pickUpTime}`;
        // 3. Create the Date object. 
        // Using `new Date(string)` is generally reliable for ISO formats.
        const mongoDate = new Date(combinedDateTimeString);

        // Optional: Validation to ensure a valid Date object was created
        if (isNaN(mongoDate.getTime())) {
            console.error(`Invalid date string created: ${combinedDateTimeString}`);
            return null;
        }

        return mongoDate;
    } catch (error) {
        console.error("Error converting date and time strings:", error.message);
        return null;
    }
}