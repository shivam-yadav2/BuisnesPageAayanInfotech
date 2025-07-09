import React, { useState } from "react";
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

const Services = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [activeModalOpen, setActiveModalOpen] = useState(false);

  return (
    <div>
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b flex justify-between items-center">
          <CardTitle>Slider Images</CardTitle>
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
                    <Input type="file" accept="image/*" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="altText">Alt Text</Label>
                    <Input id="altText" type="text" placeholder="Slider Image" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Slider</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-5 grid-cols-1">
            <Card className="p-2">
              <div>
                <img
                  className="rounded-2xl w-full"
                  src="https://placehold.co/300x200"
                  alt=""
                />
                <div className="flex justify-between items-center mt-4">
                  <h2 className="text-md font-semibold">
                    Lorem ipsum dolor sit amet.
                  </h2>
                  <Badge variant="destructive">Badge</Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Button variant="destructive">Delete</Button>
                  <Dialog open={activeModalOpen} onOpenChange={setActiveModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="">Active</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Confirm Status Change</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to change the active status?</p>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setActiveModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="button">Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="">Update</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Slider</DialogTitle>
                      </DialogHeader>
                      <form>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label >Image (optional)</Label>
                            <Input  type="file" accept="image/*" />
                          </div>
                          <div className="grid gap-2">
                            <Label >Alt Text</Label>
                            <Input
                              
                              type="text"
                              defaultValue="Lorem ipsum dolor sit amet."
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="isActive">Active</Label>
                            <input id="isActive" type="checkbox" className="h-4 w-4" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setUpdateModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Update Slider</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;