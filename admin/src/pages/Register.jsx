import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';

const Register = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className="lg:min-w-[400px] min-w-[80%]">
                <Card>
                    <CardHeader>

                        <CardTitle>Create Your Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="grid gap-4">
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Email</Label>
                                        <Input type="email" placeholder="xxxxx@gmail.com" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Password</Label>
                                        <Input type="password" placeholder="xxxxxxxxxxxx" />
                                    </div>
                                </div>
                                <Button type="submit">Register Now</Button>
                                <p>Already have an Account? <NavLink className='underline' to='/'>Login Now</NavLink></p>

                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Register