import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreVertical,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  AlertTriangle,
  XCircle,
  FileUser,
  Trash2,
} from "lucide-react";

// API URL as a constant
const API_BASE_URL = "https://aayan.samadhaangroups.co.in/api/v1";

// Static data for inquiries
const staticEnquiries = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    message: "Interested in buying a property",
    status: "new",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    message: "Looking for land investment options",
    status: "contacted",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    message: "Need details about home pricing",
    status: "interested",
  },
  {
    _id: "4",
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    message: "Not serious, just browsing",
    status: "fake",
  },
];

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredEnquiries, setFilteredEnquiries] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null); // 'status' or 'delete'
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const config = {
        method: "get",
        url: `${API_BASE_URL}/enquiry/getAll`,
        headers: {},
        data: "",
      };

      const response = await axios.request(config);
      console.log("API Response:", response?.data);
      // Static data is used regardless of API response
      setFilteredEnquiries(response?.data?.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError("Unable to load sales inquiries. Using static data.");
      toast.error("Failed to load API data, displaying static data");
      setFilteredEnquiries(staticEnquiries);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (enrollmentId) => {
    setSelectedEnrollment(enrollmentId);
    setDialogType("delete");
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await toast.promise(
        axios.post(
          `${API_BASE_URL}/enquiry/delete`,
          { id: selectedEnrollment }, // payload (body)
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          loading: "Deleting enquiry...",
          success: "Enquiry deleted successfully",
          error: "Failed to delete enquiry",
        }
      );
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    } finally {
      fetchEnquiries();

      setIsSubmitting(false);
      setIsDialogOpen(false);
      setSelectedEnrollment(null);
      setDialogType(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {error}
          </div>
        </div>
      )}

      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>Aayan Inquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredEnquiries.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No sales inquiries found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries?.map((enquiry) => {
                  return (
                    <TableRow key={enquiry._id}>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>{enquiry.email}</TableCell>
                      <TableCell>{enquiry.message}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(enquiry._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>"Confirm Deletion"</AlertDialogTitle>
            <AlertDialogDescription>
              "Are you sure you want to delete this enquiry? This action cannot
              be undone."
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isSubmitting}>
              {isSubmitting
                ? dialogType === "delete"
                  ? "Deleting..."
                  : "Updating..."
                : dialogType === "delete"
                ? "Yes, Delete"
                : "Yes, Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contact;
