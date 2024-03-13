"use client";

import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteFieldProps {
  onClick: () => void;
}

const DeleteField: FC<DeleteFieldProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button onClick={onClick} size="sm" variant="destructive">
            <Trash className="h-4 w-4" strokeWidth={2} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Field</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteField;
