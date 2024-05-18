"use client";

import { Button } from "@ui/components/ui/button";
import { useToast } from "@ui/components/ui/use-toast";
import { cn } from "@ui/lib/utils";
import { CheckCircle, CheckIcon, CopyIcon } from "lucide-react";
import React from "react";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
};

const CopyMessage = () => (
  <div className="flex items-center space-x-2">
    <CheckCircle className="text-primary size-4" />
    <span>복사되었습니다.</span>
  </div>
);

export default function CopyButton( props: CopyButtonProps ) {
  const [copied, setCopied] = React.useState(false);
  const { toast, dismiss } = useToast();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.value);
    toast({
      title: <CopyMessage />,
    });
    setCopied(true);
    setTimeout(() => {
      dismiss();
      setCopied(false);}, 2000);
  }; 

  return (
    <Button
      size="icon"
      className={cn(
        "relative z-10 size-6",
        props.className
      )}
      onClick={copyToClipboard}
      {...props}
    >
      <span className="sr-only">복사</span>
      <CopyIcon className={cn("size-3", copied && "hidden")} />
      <CheckIcon className={cn("hidden size-3", copied && "block")} />
    </Button>

  );
}