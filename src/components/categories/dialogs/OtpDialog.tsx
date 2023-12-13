import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";

interface OtpDialogProps {
  handleOnKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  otp: string[];
  setOtpDialog?: (val: boolean) => void;
  otpDialog: boolean;
  handleOtpSubmit: () => void;
  OtpPending: boolean;
  handleOnOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeOTPIndex: number;
  inputRef: React.Ref<HTMLInputElement> | undefined;
}

const OtpDialog: React.FC<OtpDialogProps> = ({
  OtpPending,
  handleOtpSubmit,
  otpDialog,
  inputRef,
  activeOTPIndex,
  handleOnKeyDown,
  setOtpDialog,
  otp,
  handleOnOtpChange,
}) => {
  return (
    <Dialog open={otpDialog} onOpenChange={setOtpDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center">
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>Please enter you valid OTP.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center gap-2">
              {otp.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <Input
                      ref={index === activeOTPIndex ? inputRef : null}
                      value={otp[index]}
                      id="otp"
                      type="number"
                      onChange={handleOnOtpChange}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      onWheel={(e) => (e.target as HTMLElement).blur()}
                      className="border-content w-[50px] h-[50px] text-lg"
                    />
                  </React.Fragment>
                );
              })}
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
