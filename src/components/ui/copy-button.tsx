"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
};

export default function CopyButton( props: CopyButtonProps ) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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