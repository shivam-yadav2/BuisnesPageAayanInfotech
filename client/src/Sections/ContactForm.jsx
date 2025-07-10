import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import EnquiryForm from "@/components/signup-form-demo";

const branches = [
  {
    name: "Downtown Campus",
    address: "123 Main Street, City Center, Metropolis",
  },
  {
    name: "Uptown Campus",
    address: "456 Oak Avenue, Uptown District, Metropolis",
  },
  {
    name: "Westside Branch",
    address: "789 Pine Road, Westside, Metropolis",
  },
  {
    name: "Eastside International",
    address: "321 Maple Lane, Eastside, Metropolis",
  },
];

const ContactForm = () => {
  return (
    <section id="contact" >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-primary"></div>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            quibusdam atque laboriosam consectetur perspiciatis reiciendis
            corporis quo repellendus necessitatibus enim dicta labore ad quaerat
            quas, expedita fuga sunt, minima eveniet!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((branch, idx) => (
              <Card key={idx} className="flex items-start gap-3 p-4">
                <MapPin className="text-primary mt-1" />
                <CardContent className="p-0">
                  <h3 className="font-semibold text-primary/90">
                    {branch.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {branch.address}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
