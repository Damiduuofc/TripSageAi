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
          text: `Generate a Travel Plan for Location: Las Vegas, for 3 Days for a Couple with a Cheap budget. 
Give me a Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions and suggest an itinerary with placeName, placeDetails, placeImageURL, geoCoordinates, ticketPricing, and time to travel each of the locations for 3 days with each day plan including specific time slots like 8am to 10am, 10am to 12pm, 1pm to 3pm, etc. in JSON format.`,
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
    "day1": [
      {
        "name": "Fremont Street Experience",
        "details": "Walk down Fremont Street, enjoy the light show, and check out the street performers.",
        "imageUrl": "https://www.fremontstreetexperience.com/sites/default/files/images/freemont-street-experience-light-show.jpg",
        "geoCoordinates": "36.1699° N, 115.1422° W",
        "ticketPrice": "Free",
        "timeSlot": "8am to 10am",
        "bestTimeToVisit": "Evening for the light show"
      },
      {
        "name": "Neon Museum",
        "details": "Explore the Neon Museum and see vintage Vegas signs.",
        "imageUrl": "https://neonmuseum.org/assets/images/experience/visit/tickets/popup/garden.jpg",
        "geoCoordinates": "36.1725° N, 115.1335° W",
        "ticketPrice": "$20 per person",
        "timeSlot": "10am to 12pm",
        "bestTimeToVisit": "Morning"
      },
      {
        "name": "Lunch at Heart Attack Grill",
        "details": "Have lunch at the famous Heart Attack Grill.",
        "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/0e/5a/f4/b4/photo2jpg.jpg",
        "geoCoordinates": "36.1699° N, 115.1422° W",
        "ticketPrice": "Varies",
        "timeSlot": "12pm to 2pm",
        "bestTimeToVisit": "Lunch"
      },
      {
        "name": "Mob Museum",
        "details": "Visit the Mob Museum to learn about the history of organized crime in Las Vegas.",
        "imageUrl": "https://www.travelnevada.com/wp-content/uploads/2020/01/MobMuseum.jpg",
        "geoCoordinates": "36.1725° N, 115.1398° W",
        "ticketPrice": "$30 per person",
        "timeSlot": "2pm to 4pm",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "name": "Fremont Street Experience (Evening)",
        "details": "Return to Fremont Street for the evening light show.",
        "imageUrl": "https://www.fremontstreetexperience.com/sites/default/files/images/freemont-street-experience-light-show.jpg",
        "geoCoordinates": "36.1699° N, 115.1422° W",
        "ticketPrice": "Free",
        "timeSlot": "8pm to 10pm",
        "bestTimeToVisit": "Evening"
      }
    ],
    "day2": [
      {
        "name": "Hoover Dam",
        "details": "Take a day trip to Hoover Dam, one of the world's most iconic engineering marvels.",
        "imageUrl": "https://www.nps.gov/media/photo/legacy/20007/0.jpg",
        "geoCoordinates": "36.0333° N, 114.9228° W",
        "ticketPrice": "$30 per person",
        "timeSlot": "8am to 1pm",
        "bestTimeToVisit": "Morning or late afternoon to avoid the heat"
      },
      {
        "name": "Lunch at Boulder City",
        "details": "Enjoy lunch at a local restaurant in Boulder City.",
        "imageUrl": "https://www.lasvegasadvisor.com/wp-content/uploads/2017/04/boulder-city-nevada-main-street.jpg",
        "geoCoordinates": "35.9789° N, 114.8345° W",
        "ticketPrice": "Varies",
        "timeSlot": "1pm to 2pm",
        "bestTimeToVisit": "Lunch"
      },
      {
        "name": "Lake Mead National Recreation Area",
        "details": "Spend the afternoon at Lake Mead for some outdoor activities.",
        "imageUrl": "https://www.nps.gov/lake/planyourvisit/images/Lake_Mead_from_River_Mountain_1152x864.jpg",
        "geoCoordinates": "36.1458° N, 114.5641° W",
        "ticketPrice": "$25 per vehicle",
        "timeSlot": "2pm to 5pm",
        "bestTimeToVisit": "Afternoon"
      }
    ],
    "day3": [
      {
        "name": "The Strip",
        "details": "Explore the Las Vegas Strip, check out the casinos, and enjoy the free shows.",
        "imageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/full_width/public/images/hero-images/lv-strip-02-1200x630.jpg",
        "geoCoordinates": "36.1127° N, 115.1730° W",
        "ticketPrice": "Free",
        "timeSlot": "8am to 12pm",
        "bestTimeToVisit": "Anytime, but evenings offer the best atmosphere"
      },
      {
        "name": "Lunch at The Strip",
        "details": "Have lunch at one of the many restaurants on the Strip.",
        "imageUrl": "https://www.vegas.com/sites/default/files/field/image/buddy_v_s_ristorante_dining_venue_720x460.png",
        "geoCoordinates": "36.1127° N, 115.1730° W",
        "ticketPrice": "Varies",
        "timeSlot": "12pm to 2pm",
        "bestTimeToVisit": "Lunch"
      },
      {
        "name": "Bellagio Conservatory & Botanical Gardens",
        "details": "Visit the Bellagio Conservatory & Botanical Gardens.",
        "imageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/things-to-do/conservatory/bellagio-things-to-do-conservatory-2x1.jpg",
        "geoCoordinates": "36.1126° N, 115.1760° W",
        "ticketPrice": "Free",
        "timeSlot": "2pm to 4pm",
        "bestTimeToVisit": "Afternoon"
      },
      {
        "name": "Evening at The Strip",
        "details": "Spend the evening enjoying the night life and free shows on the Strip.",
        "imageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/full_width/public/images/hero-images/lv-strip-02-1200x630.jpg",
        "geoCoordinates": "36.1127° N, 115.1730° W",
        "ticketPrice": "Free",
        "timeSlot": "8pm to 10pm",
        "bestTimeToVisit": "Evening"
      }
    ]
  }
}
\`\`\`
`,
        },
      ],
    },
  ],
});
