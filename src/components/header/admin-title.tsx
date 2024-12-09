import React from "react";

export default function AdminTitle({
  title,
  description,
  dialog,
}: {
  title: string;
  description: string;
  dialog: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center gap-2 px-10 py-4">
      <div className="mr-auto flex flex-col gap-2">
        <h1>{title}</h1>
        <span className="text-lead">{description}</span>
      </div>
      {dialog}
    </div>
  );
}
