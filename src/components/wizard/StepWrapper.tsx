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
      <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-8 leading-snug">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
