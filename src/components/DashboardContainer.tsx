interface DashboardContainerProps {
  children: React.ReactNode;
}

export default function DashboardContainer({
  children,
}: DashboardContainerProps) {
  return <div className="pt-7 pl-10">{children}</div>;
}
