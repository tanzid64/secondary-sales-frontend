import { FC, ReactNode } from "react";

interface LoaderProps {
  children?: ReactNode;
  isLoading: boolean;
}

export const Loader: FC<LoaderProps> = ({ children, isLoading }) => {
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <>{children}</>
  );
};
