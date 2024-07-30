import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
    const auth = useAuth();
    const { user, login, handleLogout, openDialog, setOpenDialog } = auth || {};

    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5 fixed top-0 left-0 right-0 bg-white z-50'>
            <a href='/' rel='noopener noreferrer'>
                <img src='/Logo.png' width={100} height={60} alt='Logo' />
            </a>

            <div>
                {user ? (
                    <div className='flex items-center gap-3'>
                        <a href='/create-trip'>
                            <Button variant="outline" className="rounded-full">+ Create Trip</Button>
                        </a>
                        <a href='/my-trips'>
                            <Button variant="outline" className="rounded-full">My Trips</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt='User Profile' />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className='cursor-pointer' onClick={handleLogout}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                )}
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sign In With Google</DialogTitle>
                        <DialogDescription>
                            <img src='/Logo.png' width={150} alt='Logo' />
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign in to the App with Google authentication securely</p>
                            <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                                <FcGoogle className='h-7 w-7' />
                                Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
