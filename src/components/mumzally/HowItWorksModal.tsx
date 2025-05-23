
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { UserCircle, MapPin, MessageCircle, Heart, ArrowLeft, Info, X } from "lucide-react";

const steps = [
  {
    icon: <UserCircle className="w-6 h-6 text-primary" />,
    title: "Create Your Profile",
    description: "Set up your profile with your interests, kids' details, and your location.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Moms In Your Area",
    description: "Discover moms near you who share similar interests and have children of similar ages.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "Send Connection Requests",
    description: "Send a LeanOn request to moms you'd like to connect with, then start a conversation to plan meetups.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Build Your Community",
    description: "Create meaningful connections with local moms through playdates, coffee meetups, or other activities.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  }
];

interface HowItWorksModalProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trackingName?: string;
}

const HowItWorksModal = ({ className, open, onOpenChange, trackingName }: HowItWorksModalProps) => {
  if (open !== undefined && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20 p-6 pt-8 pb-8 max-h-[95vh] overflow-y-auto">
          <DialogHeader className="relative mb-2">
            <DialogTitle className="text-2xl text-center mb-4">
              How to Connect with Moms Around You
            </DialogTitle>
            <DialogClose className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          
          <div className="grid gap-6 mt-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br ${step.bgColor} border border-[#FFF8E7] shadow-sm`}
              >
                <div className="shrink-0 w-10 h-10 bg-[#FFD9A7] rounded-full p-2 flex items-center justify-center shadow-sm">
                  <span className="font-medium text-foreground">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className={`rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors flex items-center ${className || ""}`}
          trackingName={trackingName}
        >
          <Info className="h-5 w-5 mr-2 flex-shrink-0 my-auto" /> 
          <span className="my-auto">How It Works</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20 p-6 pt-8 pb-8 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="relative mb-2">
          <DialogTitle className="text-2xl text-center mb-4">
            How to Connect with Moms Around You
          </DialogTitle>
          <DialogClose className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid gap-6 mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br ${step.bgColor} border border-[#FFF8E7] shadow-sm`}
            >
              <div className="shrink-0 w-10 h-10 bg-[#FFD9A7] rounded-full p-2 flex items-center justify-center shadow-sm">
                <span className="font-medium text-foreground">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;
