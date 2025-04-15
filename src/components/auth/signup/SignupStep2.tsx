
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface SignupStep2Props {
  phone: string;
  otpValue: string;
  setOtpValue: (value: string) => void;
  onResendOTP: () => void;
  isLoading: boolean;
}

const SignupStep2 = ({ phone, otpValue, setOtpValue, onResendOTP, isLoading }: SignupStep2Props) => {
  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    if (phone.length <= 9) {
      if (phone.length <= 2) return phone;
      if (phone.length <= 5) return `${phone.substring(0, 2)} ${phone.substring(2)}`;
      return `${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5)}`;
    }
    return phone;
  };

  return (
    <CardContent className="space-y-6 pt-6">
      <div className="text-center mb-4">
        <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium">
          +971 {formatPhoneDisplay(phone)}
        </div>
      </div>
      
      <div className="flex justify-center">
        <InputOTP 
          maxLength={4} 
          value={otpValue} 
          onChange={setOtpValue}
          className="gap-2"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      
      <div className="text-center flex flex-col gap-2">
        <Button 
          variant="link" 
          type="button" 
          onClick={onResendOTP}
          disabled={isLoading}
          className="text-muted-foreground text-sm"
        >
          Didn't receive a code? Resend
        </Button>
        
        <Button
          variant="outline"
          type="button"
          size="sm"
          className="mx-auto text-xs"
        >
          Skip verification (for testing)
        </Button>
      </div>
    </CardContent>
  );
};

export default SignupStep2;

