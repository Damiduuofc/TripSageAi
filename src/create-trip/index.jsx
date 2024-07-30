import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '../constants/options.jsx';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal.jsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState({ location: '', noOfdays: '', budget: '', Traveler: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, login, openDialog, setOpenDialog } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const OnGenerateTrip = async () => {
        if (!user) {
            setOpenDialog(true);
            return;
        }
        if (formData.noOfdays <= 0 || formData.noOfdays > 10) {
            toast.error("Number of days should be between 1 and 10.");
            return;
        }

        if (!formData.location || !formData.noOfdays || !formData.budget || !formData.Traveler) {
            setError('Please fill out all fields.');
            return;
        }

        setError('');
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label || '')
            .replace('{totalDays}', formData.noOfdays)
            .replace('{traveler}', formData.Traveler)
            .replace('{budget}', formData.budget);

        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log("Generated Trip Data:", result?.response?.text());
            await SaveAiTrip(result?.response?.text());
        } catch (error) {
            toast.error("An error occurred while generating the trip.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        try {
            let parsedTripData;

            try {
                parsedTripData = JSON.parse(TripData);
            } catch (error) {
                console.error("Error parsing TripData:", error);
                toast.error("An error occurred while parsing the trip data.");
                setLoading(false);
                return;
            }

            const docId = Date.now().toString();
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: parsedTripData,
                userEmail: user?.email,
                id: docId
            });

            console.log("Trip data successfully saved to Firestore.");
            navigate('/view-trip/' + docId);
        } catch (error) {
            toast.error("An error occurred while saving the trip data.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 p-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🌍✈️🏖️🏔️🍽️🏨</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just give us a few details, and our trip planner will create a personalized itinerary just for you.
            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What's your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v); }
                        }}
                    />
                </div> 
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning for your trip?</h2>
                    <input
                        placeholder='Example: 3'
                        type='number'
                        className='border border-gray-300 rounded p-2 w-full'
                        value={formData.noOfdays}
                        onChange={(e) => handleInputChange('noOfdays', e.target.value)}
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <div>
                    <h2 className='text-xl my-3 font-medium'>What's your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelersList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('Traveler', item.people)}
                                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData.Traveler === item.people && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='my-10 justify-end flex'>
                    <Button
                        disabled={loading}
                        onClick={OnGenerateTrip}
                        className='flex items-center'
                    >
                        {loading ? (
                            <>
                                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                            </>
                        ) : (
                            'Generate Trip'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;
