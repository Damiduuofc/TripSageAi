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
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState({ location: '', noOfdays: '', budget: '', Traveler: '' });
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const OnGenerateTrip = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

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
            const user = JSON.parse(localStorage.getItem('user'));
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

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((resp) => {
            console.log("User profile fetched:", resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            OnGenerateTrip();
        })
        .catch((error) => {
            console.error("Error fetching user profile:", error);
            toast.error("An error occurred while fetching the user profile.");
        });
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
                <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Sign In With Google</DialogTitle>
                            <DialogDescription>
                                <img src='/Logo.png' width={150} alt='Logo' />
                                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                                <p>Sign in to the App with Google authentication securely</p>
                                <Button
                                    onClick={login}
                                    className="w-full mt-5 flex gap-4 items-center"
                                >
                                    <FcGoogle className='h-7 w-7' />
                                    Sign In With Google
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default CreateTrip;
