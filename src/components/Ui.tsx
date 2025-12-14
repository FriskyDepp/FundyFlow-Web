import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
};

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button {...rest} className={`px-3 py-2 rounded-lg bg-blue-600/10 border border-blue-700/50 text-white hover:bg-blue-500 ${className}`.trim()}>
      {children}
    </button>
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return <textarea {...rest} className={`w-full rounded-md p-2 ${className}`.trim()} />;
}

export function Badge({ children, className = "", variant }: { children: React.ReactNode; className?: string; variant?: string }) {
  // variant is accepted for compatibility with existing usages
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md bg-gray-500 text-xs ${className}`.trim()}>{children}</span>;
}

export default null;
