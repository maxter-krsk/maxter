import * as React from "react";

export function PolicyTab({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
PolicyTab.displayName = "PolicyTab";
