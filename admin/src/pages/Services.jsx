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

const Services = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });
    const [updateFormData, setUpdateFormData] = useState({
        title: "",
        image: null,
        isActive: true,
    });

    const [serviceData, setServiceData] = useState();

    const { refreshAccessToken, isTokenExpire } = useContext(MyContext);

    const fetchServices = async () => {
        try {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://localhost:4000/api/v1/service/get-services",
            };
            const response = await axios.request(config);
            setServiceData(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch services");
        }
    };

    const handleAddChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleUpdateChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        setUpdateFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        }));
    };

    const addService = async (e) => {
        e.preventDefault();
        const val = isTokenExpire();
        if (val) {
            await refreshAccessToken();
        }

        try {
            const Token = Cookies.get("accessTokenAdmin");
            let data = new FormData();
            data.append("title", formData.title);
            if (formData.image) data.append("image", formData.image);

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://localhost:4000/api/v1/service/add-service",
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
                data: data,
            };
            const response = await axios.request(config);
            toast.success("Service added successfully");
            setFormData({ title: "", image: null });
            setAddModalOpen(false);
            fetchServices();
        } catch (error) {
            toast.error("Failed to add service");
        }
    };

    const updateService = async (e) => {
        e.preventDefault();
        const val = isTokenExpire();
        if (val) {
            await refreshAccessToken();
        }

        try {
            const Token = Cookies.get("accessTokenAdmin");
            let data = {
                id: selectedService._id,
                title: updateFormData.title,
                isActive: updateFormData.isActive
            }
            if (updateFormData.image) {
                data = {
                    ...data,
                    image: updateFormData.image
                }
            }

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `http://localhost:4000/api/v1/service/update-service`,
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
                data: data,
            };
            const response = await axios.request(config);
            toast.success("Service updated successfully");
            setUpdateModalOpen(false);
            fetchServices();
        } catch (error) {
            toast.error("Failed to update service");
        }
    };

    const deleteService = async () => {
        const val = isTokenExpire();
        if (val) {
            await refreshAccessToken();
        }

        try {
            const Token = Cookies.get("accessTokenAdmin");
            let config = {
                method: "POST",
                maxBodyLength: Infinity,
                url: `http://localhost:4000/api/v1/service/delete-service`,
                headers: {
                    Authorization: `Bearer ${Token}`,
                    Accept: "application/json",
                },
                data: {
                    id: selectedService._id
                }
            };
            const response = await axios.request(config);
            console.log(response)
            toast.success("Service deleted successfully");
            setDeleteModalOpen(false);
            fetchServices();
        } catch (error) {
            toast.error("Failed to delete service");
        }
    };

    

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div>
            <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b flex justify-between items-center">
                    <CardTitle>Services</CardTitle>
                    <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button>Add Service</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New Service</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Image</Label>
                                        <Input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Service Name</Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleAddChange}
                                            placeholder="Service name"
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={addService}>Add Service</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="grid lg:grid-cols-3 gap-5 grid-cols-1">
                        {serviceData?.length > 0 ? (
                            serviceData.map((item, index) => (
                                <Card className="p-2" key={item._id}>
                                    <div>
                                        <img
                                            className="rounded-2xl h-[200px] w-full"
                                            src={`http://localhost:4000/${item?.image}`}
                                            alt={item?.title}
                                        />
                                        <div className="flex justify-between items-center mt-4">
                                            <h2 className="text-md font-semibold">{item?.title}</h2>
                                            <Badge variant={item?.isActive ? "secondary" : "destructive"}>
                                                {item?.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => setSelectedService(item)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Delete</DialogTitle>
                                                    </DialogHeader>
                                                    <p>Are you sure you want to delete this service?</p>
                                                    <DialogFooter>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => setDeleteModalOpen(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={deleteService}>Confirm</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            
                                            <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedService(item);
                                                            setUpdateFormData({
                                                                title: item.title,
                                                                image: null,
                                                                isActive: item.isActive,
                                                            });
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>Update Service</DialogTitle>
                                                    </DialogHeader>
                                                    <form>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid gap-2">
                                                                <Label>Image (optional)</Label>
                                                                <Input
                                                                    type="file"
                                                                    name="image"
                                                                    accept="image/*"
                                                                    onChange={handleUpdateChange}
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label>Service Name</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="title"
                                                                    value={updateFormData.title}
                                                                    onChange={handleUpdateChange}
                                                                    placeholder="Service name"
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
                                                            <Button onClick={updateService}>Update Service</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p>No services available</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Services;