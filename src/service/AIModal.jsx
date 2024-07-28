import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
{
  "hotels": [
    {
      "hotelName": "The D Las Vegas",
      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
      "price": "$50-$100 per night",
      "hotelImageUrl": "https://www.thelinq.com/sites/default/files/styles/gallery_full_width/public/2022-06/the-d-las-vegas-hotel-casino-freemont-street-experience.jpg",
      "geoCoordinates": "36.1699° N, 115.1422° W",
      "rating": "4.0",
      "description": "A budget-friendly hotel located in the heart of Fremont Street, with a casino and several dining options."
    },
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": "$40-$80 per night",
      "hotelImageUrl": "https://media.timeout.com/images/103133234/image.jpg",
      "geoCoordinates": "36.1118° N, 115.1736° W",
      "rating": "3.5",
      "description": "A classic Vegas hotel with a circus theme, known for its affordable rates and family-friendly atmosphere."
    },
    {
      "hotelName": "Golden Nugget Hotel & Casino",
      "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",
      "price": "$60-$120 per night",
      "hotelImageUrl": "https://www.goldennugget.com/sites/default/files/styles/large/public/2022-09/Golden-Nugget-Las-Vegas-Hero-Image_0.jpg",
      "geoCoordinates": "36.1697° N, 115.1414° W",
      "rating": "4.5",
      "description": "A stylish and modern hotel located on Fremont Street, with a large casino, pool, and multiple dining options."
    },
    {
      "hotelName": "The Orleans Hotel & Casino",
      "hotelAddress": "4500 W Tropicana Ave, Las Vegas, NV 89103",
      "price": "$45-$90 per night",
      "hotelImageUrl": "https://www.orleanscasino.com/sites/default/files/styles/gallery_full_width/public/2019-06/orleans-hero-image.jpg",
      "geoCoordinates": "36.0979° N, 115.1637° W",
      "rating": "3.8",
      "description": "A large hotel and casino with a variety of amenities, including a golf course, pool, and multiple dining options."
    },
    {
      "hotelName": "South Point Hotel, Casino & Spa",
      "hotelAddress": "9777 Las Vegas Blvd S, Las Vegas, NV 89183",
      "price": "$55-$100 per night",
      "hotelImageUrl": "https://www.southpointcasino.com/sites/default/files/styles/large/public/2022-10/South-Point-Hero-Image_0.jpg",
      "geoCoordinates": "36.0345° N, 115.1113° W",
      "rating": "4.2",
      "description": "A large resort with a casino, spa, and multiple dining options, located on the south end of the Las Vegas Strip."
    }
  ],
  "itinerary": {
    "day1": {
      "name": "Fremont Street Experience",
      "details": "Walk down Fremont Street, enjoy the light show, and check out the street performers.",
      "imageUrl": "https://www.fremontstreetexperience.com/sites/default/files/images/freemont-street-experience-light-show.jpg",
      "geoCoordinates": "36.1699° N, 115.1422° W",
      "ticketPrice": "Free",
      "timeToSpend": "2-3 hours",
      "bestTimeToVisit": "Evening for the light show"
    },
    "day2": {
      "name": "Hoover Dam",
      "details": "Take a day trip to Hoover Dam, one of the world's most iconic engineering marvels.",
      "imageUrl": "https://www.nps.gov/media/photo/legacy/20007/0.jpg",
      "geoCoordinates": "36.0333° N, 114.9228° W",
      "ticketPrice": "$30 per person",
      "timeToSpend": "4-5 hours",
      "bestTimeToVisit": "Morning or late afternoon to avoid the heat"
    },
    "day3": {
      "name": "The Strip",
      "details": "Explore the Las Vegas Strip, check out the casinos, and enjoy the free shows.",
      "imageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/full_width/public/images/hero-images/lv-strip-02-1200x630.jpg",
      "geoCoordinates": "36.1127° N, 115.1730° W",
      "ticketPrice": "Free",
      "timeToSpend": "Full day",
      "bestTimeToVisit": "Anytime, but evenings offer the best atmosphere"
    }
  }
}
\`\`\`

**Explanation:**

* **Hotels:** The list provides 5 budget-friendly hotels in Las Vegas, including their prices, addresses, images, ratings, and descriptions. 
* **Itinerary:** The itinerary suggests a 3-day plan for a couple, featuring popular attractions:
    * **Day 1:** Fremont Street Experience for an evening of entertainment.
    * **Day 2:** A day trip to Hoover Dam, showcasing its engineering marvel.
    * **Day 3:** Exploring the Las Vegas Strip, experiencing casinos and free shows.

**Tips for Saving Money:**

* **Travel off-season:** Avoid peak season (March-May and September-November) to get cheaper flights and hotel rates.
* **Use public transportation:** The Las Vegas Monorail and public buses offer affordable transportation options.
* **Take advantage of free activities:** Las Vegas has many free attractions, such as the Fremont Street Experience, Bellagio Fountains, and casino shows.
* **Pack snacks and drinks:** Bringing your own refreshments can save money on overpriced drinks and snacks at casinos and attractions.
* **Consider discounts:** Look for coupons and discounts online for attractions, shows, and meals.

**Note:** Prices and availability may vary, so it's recommended to check for the latest updates.
`,
        },
      ],
    },
  ],
});
