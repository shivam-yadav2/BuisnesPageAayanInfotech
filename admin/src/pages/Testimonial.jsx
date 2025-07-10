import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyContext from "../context/MyContext";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

const Testimonial = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        message: "",
    });
    const [updateFormData, setUpdateFormData] = useState({
        name: "",
        message: "",
        isActive: true,
    });

    const [testimonialData, setTestimonialData] = useState();

    const { refreshAccessToken, isTokenExpire } = useContext(MyContext);

    const fetchTestimonial = async () => {
        try {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://localhost:4000/api/v1/testimonial/get-testimonial",
            };
            const response = await axios.request(config);
            setTestimonialData(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch testimonials");
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdateFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const addTestimonial = async (e) => {
        e.preventDefault();
        const val = isTokenExpire();
        if (val) {
            await refreshAccessToken();
        }

        try {
            const Token = Cookies.get("accessTokenAdmin");
            let data = {
                name: formData.name,
                message: formData.message,
            };

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://localhost:4000/api/v1/testimonial/add-testimonial",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: data,
            };
            const response = await axios.request(config);
            toast.success("Testimonial added successfully");
            setFormData({ name: "", message: "" });
            setAddModalOpen(false);
            fetchTestimonial();
        } catch (error) {
            toast.error("Failed to add testimonial");
        }
    };

    const updateTestimonial = async (e) => {
        e.preventDefault();
        const val = isTokenExpire();
        if (val) {
            await refreshAccessToken();
        }

        try {
            const Token = Cookies.get("accessTokenAdmin");
            let data = {
                id: selectedTestimonial._id,
                name: updateFormData.name,
                message: updateFormData.message,
                isActive: updateFormData.isActive,
            };

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://localhost:4000/api/v1/testimonial/update-testimonial",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: data,
            };
            const response = await axios.request(config);
            toast.success("Testimonial updated successfully");
            setUpdateModalOpen(false);
            fetchTestimonial();
        } catch (error) {
            toast.error("Failed to update testimonial");
        }
    };

    const deleteTestimonial = async () => {
        const val = isTokenExpire();
        if (val) {
            await refreshAccessToken();
        }

        try {
            const Token = Cookies.get("accessTokenAdmin");
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://localhost:4000/api/v1/testimonial/delete-testimonial",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: {
                    id: selectedTestimonial._id,
                },
            };
            const response = await axios.request(config);
            toast.success("Testimonial deleted successfully");
            setDeleteModalOpen(false);
            fetchTestimonial();
        } catch (error) {
            toast.error("Failed to delete testimonial");
        }
    };

    useEffect(() => {
        fetchTestimonial();
    }, []);

    return (
        <div>
            <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b flex justify-between items-center">
                    <CardTitle>Testimonials</CardTitle>
                    <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button>Add Testimonial</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New Testimonial</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleAddChange}
                                            placeholder="Testimonial name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Message</Label>
                                        <Input
                                            type="text"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleAddChange}
                                            placeholder="Testimonial message"
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={addTestimonial}>Add Testimonial</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="grid lg:grid-cols-3 gap-5 grid-cols-1">
                        {testimonialData?.length > 0 ? (
                            testimonialData.map((item, index) => (
                                <Card className="p-2" key={item._id}>
                                    <div>
                                        <div className="flex justify-between items-center mt-4">
                                            <h2 className="text-md font-semibold">{item?.name}</h2>
                                            <Badge variant={item?.isActive ? "secondary" : "destructive"}>
                                                {item?.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm mt-2">{item?.message}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => setSelectedTestimonial(item)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Delete</DialogTitle>
                                                    </DialogHeader>
                                                    <p>Are you sure you want to delete this testimonial?</p>
                                                    <DialogFooter>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => setDeleteModalOpen(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={deleteTestimonial}>Confirm</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedTestimonial(item);
                                                            setUpdateFormData({
                                                                name: item.name,
                                                                message: item.message,
                                                                isActive: item.isActive,
                                                            });
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>Update Testimonial</DialogTitle>
                                                    </DialogHeader>
                                                    <form>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid gap-2">
                                                                <Label>Name</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="name"
                                                                    value={updateFormData.name}
                                                                    onChange={handleUpdateChange}
                                                                    placeholder="Testimonial name"
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label>Message</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="message"
                                                                    value={updateFormData.message}
                                                                    onChange={handleUpdateChange}
                                                                    placeholder="Testimonial message"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Label htmlFor="isActive">Active</Label>
                                                                <input
                                                                    id="isActive"
                                                                    type="checkbox"
                                                                    name="isActive"
                                                                    checked={updateFormData.isActive}
                                                                    onChange={handleUpdateChange}
                                                                    className="h-4 w-4"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => setUpdateModalOpen(false)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button onClick={updateTestimonial}>Update Testimonial</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p>No testimonials available</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Testimonial;