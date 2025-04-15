
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info, Users, ListChecks, ArrowDown, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  onHowItWorksClick: () => void;
  onConnectionRequestsClick: () => void;
  pendingRequestsCount?: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onHowItWorksClick, 
  onConnectionRequestsClick,
  pendingRequestsCount = 0
}) => {
  const navigate = useNavigate();
  const sentRequestsCount = 2; // This would come from your data source

  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-[200px] mx-auto md:mx-0">
      <Button
        className="w-full gap-2 h-11 px-8"
        variant="warm"
        size="md"
        onClick={onHowItWorksClick}
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>How It Works</span>
        </div>
      </Button>
      
      <Button
        variant="warm"
        size="md"
        className="w-full gap-2 h-11 px-8"
        onClick={onConnectionRequestsClick}
      >
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>LeanOn Requests</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="flex items-center gap-1">
              <ArrowDown className="h-3 w-3" />
              {pendingRequestsCount}
            </span>
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              {sentRequestsCount}
            </span>
          </div>
        </div>
      </Button>
      
      <Button
        variant="warm"
        size="md"
        className="w-full gap-2 h-11 px-8"
        onClick={() => navigate('/connections')}
      >
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4" />
          <span>My LeanMoms</span>
        </div>
      </Button>
    </div>
  );
};

export default ActionButtons;
