import React from "react";

interface ConditionalWrapperProps {
  condition: boolean;
  children: React.ReactNode;
  wrapper: (children: React.ReactNode) => React.ReactNode;
}
export default function ConditionalWrapper({
  condition,
  children,
  wrapper,
}: ConditionalWrapperProps) {
  return <>{condition ? wrapper(children) : children}</>;
}
