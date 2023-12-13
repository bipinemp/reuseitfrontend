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
import { Loader2 } from "lucide-react";

interface OtpDialogProps {
  otpDialog: boolean;
  setOtp: (otp: string) => void;
  handleOtpSubmit: () => void;
  OtpPending: boolean;
}

const OtpDialog: React.FC<OtpDialogProps> = ({
  OtpPending,
  handleOtpSubmit,
  otpDialog,
  setOtp,
}) => {
  return (
    <Dialog open={otpDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>Please enter you valid OTP.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="otp" className="text-left">
              OTP
            </Label>
            <div className="relative">
              <Input
                id="otp"
                type="number"
                onChange={(e) => setOtp(e.target.value)}
                onWheel={(e) => (e.target as HTMLElement).blur()}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleOtpSubmit} type="submit">
            {OtpPending ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Verifying OTP..</p>
              </div>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
