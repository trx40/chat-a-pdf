"use-client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import css from "styled-jsx/css";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default Providers;
