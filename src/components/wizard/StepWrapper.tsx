"use client";

export default function StepWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-8">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
