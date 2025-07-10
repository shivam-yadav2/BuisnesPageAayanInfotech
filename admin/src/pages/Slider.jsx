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

const Slider = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [activeModalOpen, setActiveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [formData, setFormData] = useState({
    altText: "",
    image: null,
  });
  const [updateFormData, setUpdateFormData] = useState({
    altText: "",
    image: null,
    isActive: true,
  });

  const [sliderData, setSliderData] = useState();

  const { refreshAccessToken, isTokenExpire } = useContext(MyContext);

  const fetchSlider = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/api/v1/slider/get-slider",
      };
      const response = await axios.request(config);
      setSliderData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch slider");
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

  const addSlider = async (e) => {
    e.preventDefault();
    const val = isTokenExpire();
    if (val) {
      await refreshAccessToken();
    }

    try {
      const Token = Cookies.get("accessTokenAdmin");
      let data = new FormData();
      data.append("title", formData.altText);
      if (formData.image) data.append("image", formData.image);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/api/v1/slider/add-slider",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      toast.success("Slider added successfully");
      setFormData({ title: "", image: null });
      setAddModalOpen(false);
      fetchSlider();
    } catch (error) {
      toast.error("Failed to add slider");
    }
  };

  const updateSlider = async (e) => {
    e.preventDefault();
    const val = isTokenExpire();
    if (val) {
      await refreshAccessToken();
    }

    try {
      const Token = Cookies.get("accessTokenAdmin");
      let data = {
        id: selectedSlider._id,
        title: updateFormData.altText,
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
        url: `http://localhost:4000/api/v1/slider/update-slider`,
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      toast.success("Slider updated successfully");
      setUpdateModalOpen(false);
      fetchSlider();
    } catch (error) {
      toast.error("Failed to update slider");
    }
  };

  const deleteSlider = async () => {
    const val = isTokenExpire();
    if (val) {
      await refreshAccessToken();
    }

    try {
      const Token = Cookies.get("accessTokenAdmin");
      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `http://localhost:4000/api/v1/slider/delete-slider`,
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
        },
        data: {
          id: selectedSlider._id
        }
      };
      const response = await axios.request(config);
      console.log(response)
      toast.success("Slider deleted successfully");
      setDeleteModalOpen(false);
      fetchSlider();
    } catch (error) {
      toast.error("Failed to delete slider");
    }
  };



  useEffect(() => {
    fetchSlider();
  }, []);

  return (
    <div>
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b flex justify-between items-center">
          <CardTitle>Slider</CardTitle>
          <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
            <DialogTrigger asChild>
              <Button>Add Slider</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Slider</DialogTitle>
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
                    <Label>Slider Alt Text</Label>
                    <Input
                      type="text"
                      name="altText"
                      value={formData.altText}
                      onChange={handleAddChange}
                      placeholder="Slider altText"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addSlider}>Add Slider</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-5 grid-cols-1">
            {sliderData?.length > 0 ? (
              sliderData.map((item, index) => (
                <Card className="p-2" key={item._id}>
                  <div>
                    <img
                      className="rounded-2xl h-[200px] w-full"
                      src={`http://localhost:4000/${item?.image}`}
                      alt={item?.altText}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <h2 className="text-md font-semibold">{item?.altText}</h2>
                      <Badge variant={item?.isActive ? "secondary" : "destructive"}>
                        {item?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => setSelectedSlider(item)}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                          </DialogHeader>
                          <p>Are you sure you want to delete this slider?</p>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setDeleteModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={deleteSlider}>Confirm</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedSlider(item);
                              setUpdateFormData({
                                title: item.altText,
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
                            <DialogTitle>Update Slider</DialogTitle>
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
                                <Label>Slider Name</Label>
                                <Input
                                  type="text"
                                  name="altText"
                                  value={updateFormData.altText}
                                  onChange={handleUpdateChange}
                                  placeholder="Slider altText"
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
                              <Button onClick={updateSlider}>Update Slider</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p>No slider available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Slider;