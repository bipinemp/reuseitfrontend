interface DashboardContainerProps {
  children: React.ReactNode;
}

export default function DashboardContainer({
  children,
}: DashboardContainerProps) {
  return <div className="mt-14 ml-[280px] w-full mx-auto">{children}</div>;
}
