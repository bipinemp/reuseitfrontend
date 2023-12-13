import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneDialogProps {
  phoneDialog: boolean;
  setPhoneDialog: (phoneDialog: boolean) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  PhoneNumPending: boolean;
  handlePhoneSubmit: () => void;
}

const PhoneDialog: React.FC<PhoneDialogProps> = ({
  phoneDialog,
  setPhoneDialog,
  setPhoneNumber,
  PhoneNumPending,
  handlePhoneSubmit,
}) => {
  return (
    <Dialog open={phoneDialog} onOpenChange={setPhoneDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Phone Number</DialogTitle>
          <DialogDescription>
            Please enter you valid phone number.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="phone" className="text-left">
              Phone Number
            </Label>
            <div className="relative">
              <span className="absolute left-2 top-2 pr-2 border-r-[1px] border-r-content">
                +977
              </span>
              <Input
                id="phone"
                className="pl-16"
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onWheel={(e) => (e.target as HTMLElement).blur()}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handlePhoneSubmit} type="submit">
              {PhoneNumPending ? "Sending OTP..." : "Send OTP"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneDialog;
